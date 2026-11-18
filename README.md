# alem-da-tag-platform
# Além da Tag

Plataforma interativa de Data & Martech com front-end mobile-first e backend Python.

## Pré-requisitos

- Docker com Docker Compose
- Python 3.10 ou superior

## Banco de dados

Inicie PostgreSQL e MongoDB:

```bash
docker compose up -d
```

Serviços disponíveis:

- PostgreSQL: `localhost:5432`, banco `alem_da_tag`
- MongoDB: `localhost:27017`, banco `alem_da_tag_nosql`
- Usuário e senha de desenvolvimento dos dois bancos: `alem_da_tag` / `alem_da_tag_dev`

Para encerrar os serviços:

```bash
docker compose down
```

## Backend

Crie e ative um ambiente virtual, instale as dependências e execute o servidor:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
```

A API fica disponível em `http://localhost:8000`; a documentação interativa em `http://localhost:8000/docs`.

## Front-end

Sirva os arquivos estáticos a partir da pasta `frontend`, por exemplo:

```bash
python3 -m http.server 8080 -d frontend
```

Acesse `http://localhost:8080`.