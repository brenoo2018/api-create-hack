# Outputs for api-create-hack infrastructure
# These values will be displayed after terraform apply

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = module.vpc.public_subnet_ids
}

output "ecr_repository_url" {
  description = "ECR repository URL"
  value       = module.ecr.repository_url
}

# EC2 outputs

# EC2 outputs
output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = module.ec2.instance_id
}

output "ec2_public_ip" {
  description = "EC2 public IP address"
  value       = module.ec2.public_ip
}

output "ssh_command" {
  description = "SSH command to connect to EC2"
  value       = module.ec2.ssh_command
}

output "api_url" {
  description = "API URL"
  value       = module.ec2.api_url
}

# ALB outputs - COMMENTED OUT (not available in account)
# output "load_balancer_dns" {
#   description = "Load balancer DNS name"
#   value       = module.ecs.load_balancer_dns
# }

# output "api_endpoint" {
#   description = "API endpoint URL"
#   value       = module.ecs.api_endpoint
# }

# output "health_endpoint" {
#   description = "Health check endpoint URL"
#   value       = module.ecs.health_endpoint
# }
