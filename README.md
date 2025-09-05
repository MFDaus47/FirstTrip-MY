# 🚀 FirstTrip-MY

**FirstTrip-MY** is a cost estimator calculator designed for Malaysians traveling for the first time to other states (e.g., Kuala Lumpur, Selangor, etc.), specifically for **interviews and event sessions**.

This project is containerized using **Docker** for easy setup and deployment.

---

## 📦 Services

This project consists of the following services:

1. **firstrip-db** → Main database service
2. **mongodb-admin-gui** → MongoDB Admin GUI for database management

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- Preferred IDE (e.g., VS Code)
- Terminal / Command Prompt

---

## 🚀 Installation (Local Development)

1. **Clone this repository**

   ```bash
   git clone https://github.com/MFDaus47/FirstTrip-MY.git
   ```

2. **Navigate into the project folder**

   ```bash
   cd FirstTrip-MY
   ```

3. **Build and run the containers**

   ```bash
   docker compose up -d --build
   ```

   **Explanation of flags:**

   - `-d` → Runs containers in the background (detached mode)
   - `--build` → Forces rebuild of images to ensure you get the latest changes

🎉 Your application is now up and running!

---

## 🔄 Common Commands

- **Restart services**

  ```bash
  docker-compose restart
  ```

- **Delete Container Along With Volume (Deletes all data from Database)**

  ```bash
  docker-compose down -v
  ```

  - This is used when there's a conflict between mongodb versions
  - If your mongodb service could not start, please use this command then restart container

- **View logs**
  ```bash
  docker-compose logs -f
  ```
  `-f` → Follows logs (real-time updates). Remove `-f` if you only want to see past logs.

---

## 📝 Notes

- Ensure Docker Desktop (Windows/Mac) or Docker Engine (Linux) is running before executing commands.
- If you encounter issues with containers failing, check logs using:
  ```bash
  docker compose logs service-name
  ```
  (replace `service-name` with `firstrip-db` or `mongodb-admin-gui`).

---

## 📄 License

This project is licensed under the MIT License.  
Feel free to use and contribute!
