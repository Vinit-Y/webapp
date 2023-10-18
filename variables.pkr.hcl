variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9" # Debian 12 (HVM), SSD Volume Type
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

variable "ami_description" {
  type    = string
  default = "AMI for CSYE 6225"
}

variable "ami_regions" {
  type    = list(string)
  default = ["us-east-1"]
}

variable "ami_users" {
  type    = list(string)
  default = ["855816774420", "965578530674"]
}

