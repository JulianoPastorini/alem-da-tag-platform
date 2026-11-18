from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI(title="Além da Tag")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Avaliacao(BaseModel):
    trilha_id: int
    nota: int
    comentario: str | None = None


@app.get("/trilhas")
def listar_trilhas():
    return []


@app.get("/trilhas/{trilha_id}")
def obter_trilha(trilha_id: int):
    return {"id": trilha_id}


@app.post("/avaliacoes")
def criar_avaliacao(avaliacao: Avaliacao):
    return {"status": "placeholder", "avaliacao": avaliacao}
