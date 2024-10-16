# Project Overview

This project is a web application built with Express that enables users to log in using Git providers.

Currently, it supports GitHub and GitLab.

Future Plans:
 - Add Organization Management
   - Implement Role Assignments

# Objective

This project serves as a template for creating a login system for websites.

# Enviroment

```
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

GITLAB_CLIENT_ID=your-gitlab-client-id
GITLAB_CLIENT_SECRET=your-gitlab-client-secret

SESSION_SECRET=your-session-secret

CALLBACK_URL={http||https}://{your-website-url}/auth # example https://example.com/auth
```

URL for the Website callback URL : `{http||https}://{your-website-url}/auth/{provider}/callback`

Supported Providers:
[`GitHub`](https://github.com)
[`GitLab`](https://gitlab.com)

# Command
```
docker-compose up -d
```

# Member

|Status|GitHub|Email|
|-|-|-|
|owner|[`JetsadaWijit`](https://github.com/JetsadaWijit)|jetsadawijit@outlook.com|
