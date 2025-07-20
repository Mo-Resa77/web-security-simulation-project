# 🔐 12th Project – Web Security Simulation

## 📝 Project Overview
The **12th Project** is a hands-on web security simulation designed to emulate a Capture-the-Flag (CTF) environment. Teams build, secure, and attack local web servers to test offensive and defensive cybersecurity skills. The project involves setting up vulnerable web applications, performing attacks like SQL Injection and XSS, and monitoring attacks in real-time using Splunk for log analysis.

NOTE : this only the frontend of website & apis linking 
---

## 👥 Team Structure
- **Team Members**:
  - Ahmed Salama (2210100218)
  - Badr Salah (221001606)
  - Mohamed Magdy (2210101763)
- **Roles**:
  - 1 Offensive Security Specialist (Attacker)
  - 1 System Administrator (Server/Network Setup)
  - 3 Log Analysts/Defenders (Splunk Monitoring)

---

## 🗓 Project Timeline
- **Weeks 10–12**: 
  - Build and secure local web servers using VMs.
  - Set up Splunk VM for live log analysis.
  - Develop attack tools/scripts and hide security flags.
- **Week 13 (On-Campus)**:
  - Scan college LAN to discover other teams' web servers.
  - Launch attacks and monitor logs in real-time using Splunk.
  - Collect evidence and prepare final reports.

---

## 🛡 Defender Role – Web Server Setup
### 1. Infrastructure
- **Platform**: Virtual Machine (Kali Linux or other Linux distro)
- **Web Server**: Apache
- **Programming Language**: PHP
- **Database**: MySQL
- **Setup**:
  - One Web Server VM
  - One Splunk VM (can be hosted on the same or separate laptops)

### 2. Required Features
- Homepage with navigation options (Enter the Club, Join Our Ranks, Login)
- Login page (vulnerable to SQL Injection)
- Contact form
- Embedded flag in the format: `flag_{xxxx-xxxx-xxxx}`
- Hardening measures:
  - Disable directory listing
  - Remove unused Apache modules
  - File permission hardening
  - Basic input validation
  - HTTPS with self-signed certificate (bonus)

---

## 🧨 Attacker Role – Offensive Testing
### 1. Network Scanning
- Used **nmap** to discover other teams' web servers on the college LAN.

### 2. Attack Execution
- **SQL Injection**:
  - Tool: Burp Suite (Repeater)
  - Payload: `username = ' OR 1=1 --` and `password = ferferwf`
  - Result: Bypassed login as "The Fool" and captured `flag1[7h3_f00l_7h47_d03sn't_b310ng_70_7h15_3r4]`.
- **Robots.txt Discovery**:
  - Found hidden path `/treasury` via `robots.txt` at `localhost:5000/robots.txt`.
- **Header Manipulation**:
  - Tool: Burp Suite
  - Trick: Added custom HTTP header `chief: true` for privilege escalation to "chief" role.
- Other attacks: XSS, Brute Force, Directory Traversal, Malicious File Upload.

### 3. Tools Used
- sqlmap, Burp Suite, Hydra, Nikto, WFuzz, OWASP ZAP

---

## 📊 Defender Role – Splunk & Real-Time Monitoring
- **Log Collection**:
  - Monitored `/var/log/apache2/access.log` and `/var/log/apache2/error.log`.
  - Forwarded logs to Splunk for real-time analysis.
- **Splunk Dashboards**:
  - Detected SQL Injection, XSS, and brute force attempts.
  - Traced attacker IPs and payloads.
  - Identified stolen flag attempts.
- **Note**: Attack traces in Splunk were specific to our test site, not the college-attacked site.

---

## 🚩 Flags Captured
- **SQL Injection**: `CTF{this_is_your_flag}` (from database)
- **Plain Text Password Storage**: `CTF{this_is_your_flag}` (from database)
- **Weak Token Generation**: `NTVob2hvboAZXhbXSZSbj206MjAYNs0wNg==` (base64-encoded token)
- **POST Login Test**: `CTF{this_is_your_flag}` (from token)
- **SSH Flag**: `CTF{ssh_deployed_flag}` (added via SSH during deployment)

---

## 🛠 Vulnerabilities Identified
1. **SQL Injection**:
   - Vulnerability: Raw SQL with user input.
   - Attack: Bypassed authentication using `' OR 1=1 --`.
2. **Plain Text Password Storage**:
   - Vulnerability: Passwords stored unencrypted.
   - Attack: Database read access exposed all passwords.
3. **Weak Token Generation**:
   - Vulnerability: Base64-encoded email + timestamp without encryption.
   - Attack: Decoded and forged tokens to impersonate users.
4. **No Rate Limiting**:
   - Vulnerability: Unlimited login attempts.
   - Attack: Brute-forced weak passwords.
5. **No Input Validation**:
   - Vulnerability: Unvalidated inputs.
   - Attack: Risk of injection/XSS vulnerabilities.
6. **No Rate Limiting or CAPTCHA**:
   - Vulnerability: Unlimited signup attempts.
   - Attack: Automated account creation caused spam or overload.
7. **No Duplicate User Checks**:
   - Vulnerability: Allowed multiple users with the same credentials.
   - Attack: Created confusion or account takeover risks.

---

## ✅ Final Deliverables
### 🛡 Website & Infrastructure
- Configured web server VM with Apache, PHP, and MySQL.
- Set up Splunk VM with dashboards for log analysis.
- Embedded flags in vulnerable code (e.g., SQL database, query results).
- Applied hardening measures (directory listing disabled, permissions secured).

### 💥 Offensive Report
- Performed SQL Injection, header manipulation, and robots.txt enumeration.
- Tools: Burp Suite, sqlmap, nmap.
- Captured flags: See "Flags Captured" section.
- Screenshots and logs documented successful attacks.

### 🔍 Log Analysis Report
- Detected attack traces in Splunk (SQLi, XSS, brute force).
- Tracked attacker IPs and payloads.
- Implemented response actions (e.g., IP blocking, patching vulnerabilities).
- Suggested improvements: Input validation, rate limiting, encrypted tokens.

---

## 🛠 Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your-username>/12th-Project-Web-Security-Simulation.git
