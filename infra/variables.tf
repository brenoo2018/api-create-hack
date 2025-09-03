# Variables for api-create-hack infrastructure
# All values should be parameterized and provided via terraform.tfvars

# General Configuration
variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "api-create-hack"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

# Network Configuration
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}


variable "availability_zones" {
  description = "Availability zones for subnets"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

# EC2 Configuration
variable "instance_type" {
  description = "EC2 instance type for cost optimization"
  type        = string
  default     = "t3.micro"
}

variable "key_pair_name" {
  description = "AWS Key Pair name for EC2 access"
  type        = string
}

# Application Configuration
variable "app_port" {
  description = "Port where the NestJS application runs"
  type        = number
  default     = 3333
}

# Environment Variables for Application
variable "database_url" {
  description = "PostgreSQL database connection URL"
  type        = string
  sensitive   = true
}

variable "direct_url" {
  description = "Direct PostgreSQL connection URL"
  type        = string
  sensitive   = true
}

variable "apologist_base_url" {
  description = "Base URL for Apologist API"
  type        = string
}

variable "apologist_api_key" {
  description = "API key for Apologist service"
  type        = string
  sensitive   = true
}

# Docker Configuration
variable "docker_image" {
  description = "Docker image to deploy (will be built and pushed to ECR)"
  type        = string
  default     = "api-create-hack"
}

