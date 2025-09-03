# API Create Hack - Pure Terraform Infrastructure

Complete Terraform infrastructure for deploying a NestJS API on AWS with Docker containerization. **No shell scripts required** - just `terraform init && terraform apply`.

## 🏗️ Architecture

- **VPC**: Custom VPC with public subnet
- **EC2**: t3.micro instance with Docker container auto-deployed
- **ECR**: Elastic Container Registry for Docker images
- **Docker**: Automatic build, push, and deployment via Terraform
- **Security**: IAM roles, Security Groups, encrypted storage
- **Networking**: Elastic IP, Internet Gateway

## 📁 Structure

```
infra/
├── main.tf                 # Main orchestration + Docker build/push
├── variables.tf            # Variable definitions
├── outputs.tf              # Output values
├── terraform.tfvars.example # Example configuration
├── vpc/
│   └── main.tf            # VPC and networking
├── ecr/
│   └── main.tf            # Docker registry
└── ec2/
    └── main.tf            # EC2 instance with containerized app
```

## 🚀 Quick Start

### Prerequisites

1. **AWS CLI configured**:
   ```bash
   aws configure
   ```

2. **Terraform installed** (>= 1.0)

3. **Docker installed**

4. **AWS Key Pair created** in us-east-1 region

### Simple Deployment

1. **Configure variables**:
   ```bash
   cd infra/
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your values
   ```

2. **Deploy everything**:
   ```bash
   terraform init
   terraform apply
   ```

3. **Access your API**:
   - Health Check: `http://<PUBLIC_IP>:3333/api/health`
   - API Base: `http://<PUBLIC_IP>:3333/api`

## 🔄 Update Application

To deploy code changes:

```bash
terraform apply
```

Terraform will automatically detect source code changes and rebuild/redeploy the container.

### Destroy Infrastructure
```bash
terraform destroy
```

## 🔧 Configuration

### Required Variables (terraform.tfvars)

```hcl
# AWS Configuration
key_pair_name = "your-key-pair-name"

# Environment Variables (from your .env file)
database_url      = "postgresql://..."
direct_url        = "postgresql://..."
apologist_base_url = "https://..."
apologist_api_key  = "apg_..."
```

## 🏆 What Terraform Does Automatically

1. **Infrastructure**: Creates VPC, EC2, ECR, Security Groups
2. **Docker Build**: Builds your Docker image from source
3. **ECR Push**: Pushes image to AWS container registry
4. **Container Deploy**: Runs container on EC2 with environment variables
5. **Health Monitoring**: Sets up systemd service for container management

## 🔍 How It Works

- **Source Detection**: Terraform monitors Dockerfile and `/src` changes
- **Auto Rebuild**: Triggers rebuild when source code changes
- **Zero Downtime**: EC2 user-data handles container deployment
- **Environment Variables**: Passed securely via Terraform variables

## 🔍 Troubleshooting

### Check Deployment Status
```bash
# SSH to instance
ssh -i ~/.ssh/your-key.pem ec2-user@<PUBLIC_IP>

# Check container status
docker ps
docker logs api-create-hack

# Check user-data logs
sudo tail -f /var/log/cloud-init-output.log
```

### Common Issues

1. **Container not starting**: Check Terraform variables match your .env
2. **Build fails**: Ensure Docker is running locally
3. **ECR push fails**: Verify AWS credentials and permissions

### Health Check
```bash
curl http://<PUBLIC_IP>:3333/api/health
```

## 📊 Outputs

After `terraform apply`:

- `ec2_public_ip`: Public IP address
- `ecr_repository_url`: Docker registry URL  
- `api_endpoint`: Complete API URL

## 💰 Cost Estimation

**Monthly costs (us-east-1)**:
- EC2 t3.micro: ~$8.50/month
- EBS 20GB gp3: ~$1.60/month
- Elastic IP: $3.65/month
- ECR storage: ~$0.10/GB/month
- **Total**: ~$14/month

## 🚀 Production Scaling

For production, update `terraform.tfvars`:
```hcl
instance_type = "t3.small"  # or t3.medium
```

Consider adding:
- Application Load Balancer
- Auto Scaling Group
- RDS for managed database
- CloudWatch monitoring
