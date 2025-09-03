# Main Terraform configuration for api-create-hack
# This file orchestrates all infrastructure modules

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }
}

# AWS Provider configuration
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

# Data source for availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Get ECR authorization token for Docker provider
data "aws_ecr_authorization_token" "token" {
  registry_id = module.ecr.registry_id
}

# Docker provider configuration
provider "docker" {
  registry_auth {
    address  = module.ecr.repository_url
    username = data.aws_ecr_authorization_token.token.user_name
    password = data.aws_ecr_authorization_token.token.password
  }
}

# Build and push Docker image
resource "null_resource" "docker_build_push" {
  triggers = {
    # Rebuild when Dockerfile or source code changes
    dockerfile_hash = filemd5("${path.root}/../Dockerfile")
    source_hash     = sha1(join("", [for f in fileset("${path.root}/../src", "**") : filesha1("${path.root}/../src/${f}")]))
  }

  provisioner "local-exec" {
    command = <<-EOT
      # Login to ECR
      aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${module.ecr.repository_url}
      
      # Build Docker image
      cd ${path.root}/..
      docker build -t ${var.docker_image} .
      
      # Tag for ECR
      docker tag ${var.docker_image}:latest ${module.ecr.repository_url}:latest
      
      # Push to ECR
      docker push ${module.ecr.repository_url}:latest
    EOT
  }

  depends_on = [module.ecr]
}

# VPC Module - Creates networking infrastructure
module "vpc" {
  source = "./vpc"

  project_name          = var.project_name
  environment           = var.environment
  vpc_cidr              = var.vpc_cidr
  public_subnet_cidrs   = var.public_subnet_cidrs
  availability_zones    = var.availability_zones
}

# ECR Module - Creates Docker registry
module "ecr" {
  source = "./ecr"

  project_name = var.project_name
  environment  = var.environment
}

# EC2 Module - Creates simple instance with Docker
module "ec2" {
  source = "./ec2"

  project_name    = var.project_name
  environment     = var.environment
  vpc_id          = module.vpc.vpc_id
  subnet_id       = module.vpc.public_subnet_ids[0]
  app_port        = var.app_port
  key_pair_name   = var.key_pair_name
  iam_instance_profile = aws_iam_instance_profile.ec2_instance_profile.name

}

resource "aws_iam_role" "ec2_ecr_role" {
  name = "ec2-ecr-access-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Principal = {
        Service = "ec2.amazonaws.com"
      },
      Effect = "Allow",
      Sid    = ""
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_ecr_access" {
  role       = aws_iam_role.ec2_ecr_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "ec2-ecr-instance-profile"
  role = aws_iam_role.ec2_ecr_role.name
}
