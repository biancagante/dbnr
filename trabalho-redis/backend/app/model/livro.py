from pydantic import BaseModel, Field, field_validator, model_validator
from typing import Literal

class Livro(BaseModel):
    titulo: str = Field(..., min_length=2, max_length=150)
    autor: str = Field(..., min_length=2, max_length=100)
    categoria: str = Field(..., min_length=2, max_length=50)
    ano_publicacao: int
    quantidade_disponivel: int
    status: Literal["Disponível", "Emprestado", "Indisponível"]

    @field_validator("quantidade_disponivel")
    @classmethod
    def validar_quantidade(cls, value):
        if value < 0:
            raise ValueError("Quantidade não pode ser negativa")
        return value

    @model_validator(mode="after")
    def ajustar_status(self):
        if self.quantidade_disponivel == 0:
            self.status = "Indisponível"

        elif not self.status:
            self.status = "Disponível"
        return self

    def __str__(self):
        disponibilidade = "Disponível" if self.status and self.quantidade_disponivel > 0 else "Indisponível"
        return f"({self.id}) {self.titulo} - {self.autor} ({self.ano_publicacao}) | Categoria: {self.categoria} | [{disponibilidade}]"