### Running Locally

1. From the project root, do:
```bash
docker compose up --build
```
If you change the Dockerfile or requirements.txt, you will need the --build flag when booting it up.

(This requires docker and docker compose v2,or Docker Desktop on macOS/Windows. See https://docs.docker.com/compose/install/)

2. Visit http://localhost:8000/api/health/ to confirm health of HTTP layer

3. In another terminal, open logs with:
```bash
docker compose logs -f worker
```

Then in a second terminal:
```bash
curl -X POST http://localhost:8000/api/ping/enqueue/
```

You should see a task running in the logs, confirming celery and redis are working; the task *suceeding* confirms DB function
. 
4. Visit http://localhost:8000/ and send a message; you should see an echoed reply, confirming WebSocket layer is working.

The database persists between sessions via a Docker volume. if you **do** want to wipe the database, do:
```bash
docker compose down -v
```

If you **don't** want to wipe it, just do:
```bash
docker compose down
```



### Structure
backend/config/ --- Django project config, settings, ASGI, Celery
backend/core/ --- Models, views, consumers, tasks
docker-compose.yml --- service orchestration

### Contribution
Fork from main and open a PR, be mindful not to commit secrets
