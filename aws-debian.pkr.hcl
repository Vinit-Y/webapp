packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

source "amazon-ebs" "my-ami" {
  region          = var.aws_region
  ami_name        = "${var.ami_name_prefix}_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = var.ami_description
  ami_regions     = var.ami_regions
  ami_users       = var.ami_users
  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }
  instance_type = var.instance_type
  source_ami    = var.source_ami
  ssh_username  = var.ssh_username
  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda"
    volume_size           = 25
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  // post-processor "manifest" {
  //   output = "myapp-ami.json"
  // }

  // post-processor "ami" {
  //   output_name   = "ami_id"  # This captures the AMI ID
  //   ami_name      = "my-app-ami"
  // }

  provisioner "file" {
    source      = "webappGit.zip"
    destination = "/home/admin/"
  }

  provisioner "shell" {
    script = "scripts.sh"
  }
}
