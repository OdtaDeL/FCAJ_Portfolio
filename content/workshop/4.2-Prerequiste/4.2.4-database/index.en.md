
## 4.2.4 Database

The **data tier** runs **RDS PostgreSQL** in **private data subnets** (one data subnet per AZ), isolated from application subnets — database traffic is not exposed on the public Internet; credentials live in **Secrets Manager**; an optional **bastion** supports operator access.

You can spread **RDS across multiple AZs** (for example a **primary** and a **standby / backup** across **private subnets** as in the diagram) to improve **availability (HA)** and fault tolerance. In **development**, a **single instance** is common to **optimize cost**; production can enable **Multi-AZ** / standby per your operational needs.

![RDS PostgreSQL and RDS backup in two private subnets (HA across AZs — illustrative diagram)](/images/4-Workshop/4.2.4-database-private-rds.png)

### RDS PostgreSQL

**Role:** Primary relational store for the **NestJS** / **Prisma** backend; instances sit in **private data subnets** with Postgres reachable only inside the VPC (module **rds**).

**Why we chose it:** PostgreSQL fits relational data and Prisma; RDS reduces undifferentiated ops (patching, backups baseline) versus self-managed Postgres on EC2.

### RDS Security Group (data-tier firewall)

**Role:** Security group attached to **RDS** (for example the **…-rds-sg** name from **security_groups**): ingress **TCP 5432** only from the **ECS task security group**; optional **bastion** path when bastion-to-RDS access is enabled.

**Why we chose it:** Avoids opening Postgres to 0.0.0.0/0; only the application tier (and optionally a jump host) may reach the database — smaller attack surface.

### Secrets Manager (DB password)

**Role:** Holds the **RDS master password** as a secret for wiring into the app/Lambda via IAM instead of hard-coding (module **db_password_secret** when create_rds).

**Why we chose it:** Keeps secrets out of Git and plain env files; rotation and access policy are AWS-native.

### Bastion (optional)

**Role:** **EC2** jump-style host (typically in a public subnet pattern) for admins to reach the DB over SSM/SSH depending on configuration (module **bastion**).

**Why we chose it:** Direct DB troubleshooting without publishing RDS publicly; can stay off in dev to save cost.

### Core tables (TypeORM / PostgreSQL)

Physical table names follow the TypeORM entity mappings used by the SpendWise backend.

| Table | Main role |
| :--- | :--- |
| **users** | Application users; Cognito link via `cognito_sub` and unique email. |
| **transactions** | Money movements with amount, type, category, and timestamps. |
| **budgets** | User-defined budget limits and current spending. |
| **categories** | Shared and user-defined income/expense categories. |

These four tables are the core data model used throughout the workshop. Additional fields can be added later through TypeORM migrations if the backend expands.
