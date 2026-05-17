from fastapi import APIRouter, HTTPException
from app.model.livro import Livro
from app.config import redis_cliente
import uuid
import json

router = APIRouter()

@router.post("/livros/adicionar")
def adicionar_livro(livro: Livro):
    id_livro = redis_cliente.incr("contador_livros")

    redis_cliente.set(
        f"livro:{id_livro}",
        json.dumps(livro.model_dump(), ensure_ascii=False)
    )

    return {
        "id_livro": id_livro,
        "mensagem": "Livro cadastrado com sucesso",
        "sucesso": True
    }

@router.get("/livros")
def listar_livros():
    chaves = redis_cliente.keys("livro:*")
    livros = []

    for chave in chaves:
        dados = redis_cliente.get(chave)

        if dados:
            livro = json.loads(dados)

            livros.append({
                "id": chave.split(":")[1],
                **livro
            })

    return {
        "total": len(livros),
        "livros": livros
    }

@router.get("/livros/{id_livro}")
def buscar_livro(id_livro: str):
    dados = redis_cliente.get(f"livro:{id_livro}")

    if not dados:
        raise HTTPException(status_code=404, detail="Livro não encontrado")

    return {
        "id": id_livro,
        **json.loads(dados)
    }

@router.put("/livros/{id_livro}")
def atualizar_livro(id_livro: str, livro: Livro):

    chave = f"livro:{id_livro}"

    if not redis_cliente.exists(chave):
        raise HTTPException(
            status_code=404,
            detail="Livro não encontrado"
        )

    redis_cliente.set(
        chave,
        json.dumps(livro.model_dump(), ensure_ascii=False)
    )

    return {
        "sucesso": True,
        "mensagem": "Livro atualizado com sucesso"
    }

@router.delete("/livros/{id_livro}")
def deletar_livro(id_livro: str):

    chave = f"livro:{id_livro}"

    if not redis_cliente.exists(chave):
        raise HTTPException(
            status_code=404,
            detail="Livro não encontrado"
        )

    redis_cliente.delete(chave)

    return {
        "sucesso": True,
        "mensagem": "Livro deletado com sucesso"
    }