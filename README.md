# 📅 Bookings Microservice

A minimal microservice for solo service providers to manage bookings.  
Supports **REST**, **gRPC**, **PostgreSQL persistence**, **Redis background jobs**, and **WebSocket notifications**.

---

## 1. Assumptions & Decisions

- **Domain**: Designed for a single service provider → no multi-tenant logic.  
- **Auth**: JWT bearer token (`provider` / `admin` roles).  
- **Persistence**: PostgreSQL (`bookings`, `users` tables). All timestamps in UTC.  
- **Async jobs**: Redis + Bull queue for sending reminders **10 minutes before booking start**.  
- **Notifications**: WebSocket emits `bookingCreated` to all connected clients.  
- **Inter-service comms**: gRPC endpoint (`CreateBooking`) for internal orchestration.  
- **Testing**: Unit test for booking creation + one happy path e2e test.  
- **Deployment**: Docker Compose for local dev environment (API + Postgres + Redis).  

---

## 2. Setup Instructions

### Prerequisites
- Node.js `20+`
- Docker + Docker Compose
- npm or yarn

### Steps
1. Clone repo:
   ```bash
   git clone <repo-url>
   cd bookings-service
   ```

2. Run Docker Compose
  ```docker-compose up -d```

   
