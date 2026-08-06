# DevOps Mission Report

**Agent**: devops  
**Generated**: 2026-08-06T14:15:16.172Z

---

## Build Status: failed
## Run Status: failed

## Services



## Health Checks



## Verification Logs

```
compose config: valid
compose up failed: time="2026-08-06T17:15:01+03:00" level=warning msg="/home/sio/Code/AgenticDevTeam/generated-projects/pacman3/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion"
 Image localhost/pacman3:latest Building 
 Image localhost/pacman3:latest Built 
 Network pacman3_default Creating 
 Network pacman3_default Created 
 Container pacman3-web-1 Creating 
 Container pacman3-web-1 Created 
 Container pacman3-web-1 Starting 
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint pacman3-web-1 (84cfd1d2d180f1c1b2bf9adf4e4222ba89546ea4d57414deb485acda3fc36efc): Bind for 0.0.0.0:8080 failed: port is already allocated

```
