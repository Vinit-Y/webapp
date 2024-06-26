packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-058bd2d568351da34" # Debian 12 (HVM), SSD Volume Type
}

variable "ssh_username" {
  type    = string
  default = "admin"
}

variable "ami_name_prefix" {
  type    = string
  default = "csye6225"
}

variable "instance_type" {
  type    = string
  default = "t2.micro"
}

variable "custom_ami_description" {
  type    = string
  default = "Custom AMI for CSYE 6225"
}

variable "ami_accessible_regions" {
  type    = string
  default = "us-east-1"
}

variable "ami_accessible_users" {
  type    = string
  default = "965578530674" //demo
}

variable "device_name" {
  type    = string
  default = "/dev/xvda"
}

variable "volume_size" {
  type    = number
  default = 25
}

variable "volume_type" {
  type    = string
  default = "gp2"
}

variable "profile" {
  type    = string
  default = "dev"
}

variable "file_source" {
  type    = string
  default = "webapp.zip"
}

variable "file_destination" {
  type    = string
  default = "/tmp/webapp.zip"
}

variable "file_source_boot" {
  type    = string
  default = "./packer/systemdBootUp.service"
}

variable "file_destination_boot" {
  type    = string
  default = "/tmp/systemdBootUp.service"
}

variable "file_source_cloudwatch" {
  type    = string
  default = "./packer/amazon-cloudwatch-agent.json"
}

variable "file_destination_cloudwatch" {
  type    = string
  default = "/tmp/amazon-cloudwatch-agent.json"
}

variable "shell_script_location" {
  type    = string
  default = "./packer/scripts.sh"
}


source "amazon-ebs" "my-ami" {
  region          = "${var.aws_region}"
  profile         = "${var.profile}"
  ami_name        = "${var.ami_name_prefix}_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "${var.custom_ami_description}"
  ami_regions     = ["${var.ami_accessible_regions}"]
  ami_users       = ["${var.ami_accessible_users}"]
  instance_type   = "${var.instance_type}"
  source_ami      = "${var.source_ami}"
  ssh_username    = "${var.ssh_username}"

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }


  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "${var.device_name}"
    volume_size           = "${var.volume_size}"
    volume_type           = "${var.volume_type}"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "${var.file_source}"
    destination = "${var.file_destination}"
  }

  provisioner "file" {
    source      = "${var.file_source_boot}"
    destination = "${var.file_destination_boot}"
  }

  provisioner "file" {
    source      = "${var.file_source_cloudwatch}"
    destination = "${var.file_destination_cloudwatch}"
  }

  provisioner "shell" {
    scripts      = ["${var.shell_script_location}"]
    pause_before = "10s"
    timeout      = "10s"
  }

  post-processor "manifest" {
    output     = "manifest.json"
    strip_path = true
  }
}
