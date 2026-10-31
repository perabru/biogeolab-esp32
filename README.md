<div align="center">

![BioGeoLab — briefing técnico](docs/banner.svg)

**O laboratório vai com você.**

HTML independente · 26 telas · 18 blocos tecnológicos · Fontes incorporadas

[Abrir o HTML](index.html) · [Telas](docs/telas.md) · [Stack](docs/tecnologias.md) · [Arquitetura](docs/arquitetura.md)

</div>

## O projeto

Uma estação para registrar vibrações, preservar dados no microSD, acompanhar aquisições por Wi-Fi e relacionar amostras a estudos de laboratório.

> Arquitetura documentada: ESP32 + ADXL355 + microSD + RTC + bateria. Meta de 250 Hz ainda exige ensaio. Raman é instrumento externo de laboratório; sensores ambientais adicionais são expansões com integração própria.

Este repositório contém o **briefing técnico navegável e suas demonstrações locais**. As integrações de produção descritas no projeto são o escopo de desenvolvimento, sem servidor compartilhado ou credenciais nesta versão.

## Experimente agora

1. Baixe o repositório em **Code → Download ZIP** ou clone com o comando abaixo.
2. Abra `index.html` no navegador.
3. Explore as telas, filtre a stack e teste a simulação identificada.
4. Use **Imprimir / salvar PDF** para obter a especificação completa, ou exporte o briefing em JSON.

```bash
git clone https://github.com/perabru/biogeolab-esp32.git
cd biogeolab-esp32
```

O arquivo inclui HTML, CSS, JavaScript, fontes e recursos visuais. Não exige instalação, `npm install`, chave de API ou internet para navegar. Os links da documentação oficial exigem conexão.

## O que está disponível

| Recurso | Esta versão |
| --- | --- |
| Inventário de telas | Busca, filtros, objetivo, campos, ações, estados, API e aceite |
| Tecnologias | Responsabilidade, local de uso, contrato e documentação |
| Método | Equações e demonstração com dados locais ou sintéticos |
| Entrega | Responsáveis, testes, pendências e sequência de implementação |
| Impressão | Anexo completo de telas, mesmo com filtro ativo |
| Serviço de produção | Especificado; depende de implementação e homologação |

## Tipografia e identidade

| Papel | Família | Intenção |
| --- | --- | --- |
| Títulos e marca | **Fraunces** | Títulos de inspiração setentista com corpo limpo e confortável. |
| Texto e controles | **DM Sans** | Leitura mais confortável em parágrafos, listas e botões. |
| Código e medidas | **JetBrains Mono** | Alinhamento de valores, rotas e equações. |

As fontes são incorporadas no HTML em WOFF. Textos, controles e rótulos receberam tamanhos maiores e mais espaço entre linhas. Os avisos SIL OFL acompanham o projeto em [créditos de terceiros](THIRD_PARTY_NOTICES.md).

## Percurso principal

1. **Configurar:** Identificar estação, montagem, relógio e canais.
2. **Adquirir:** Ler amostras e contar sequência/perdas.
3. **Preservar:** Gravar no microSD e transmitir sem bloquear.
4. **Relacionar:** Sessões, pontos e amostras rastreáveis.
5. **Interpretar:** Processamento, referências e revisão.

## Telas por área

| Área | Telas |
| --- | ---: |
| Público | 1 |
| Engenharia | 3 |
| Operação | 8 |
| Análise | 2 |
| Campo | 3 |
| Laboratório | 2 |
| Gestão | 4 |
| Conta | 3 |
| **Total** | **26** |

[Consultar todas as telas e critérios de aceite →](docs/telas.md)

## Quem participa

| Área | Responsabilidade |
| --- | --- |
| Informática | Firmware, protocolo, sessões, dashboard e exportação. |
| Eletrônica | Montagem, alimentação, barramentos, fixação e ensaios. |
| Análises Clínicas | Identificação e integridade de amostras ambientais, encaminhamento e qualidade de registro. |
| Química | Pergunta analítica, método, referências, espectros e limites de interpretação. |
| Administração | BOM, orçamento, logística, manutenção e continuidade. |
| Publicidade | Identidade, materiais e demonstração que distingue proposta e resultado. |

## Critérios do piloto

- [ ] Cartão ausente/cheio mostra erro e contabiliza o que foi preservado.
- [ ] Wi-Fi interrompido não mascara a situação da gravação.
- [ ] Reinício abre nova sessão e conserva origem do tempo.
- [ ] Meta de 250 Hz é medida com gravação e transmissão simultâneas.
- [ ] Arquivo externo inválido não se vincula silenciosamente à amostra errada.

Os itens descrevem testes da aplicação final. Marcar o checklist do briefing registra leitura local e não comprova a implementação.

## Decisões abertas

- Fechar placas, pinagem, alimentação e orçamento antes da montagem.
- Medir ruído, banda, consumo, drift, perdas e autonomia no conjunto.
- Definir instrumento externo disponível e formato de exportação Raman.
- Selecionar cada expansão por pergunta, método e recursos; não inventar uma lista de sensores já instalada.

## Organização do repositório

| Caminho | Conteúdo |
| --- | --- |
| [`index.html`](index.html) | Briefing completo e independente |
| [`docs/telas.md`](docs/telas.md) | Inventário das telas |
| [`docs/tecnologias.md`](docs/tecnologias.md) | Stack proposta e fontes |
| [`docs/arquitetura.md`](docs/arquitetura.md) | Fluxo e dados do domínio |
| [`docs/banner.svg`](docs/banner.svg) | Identidade aplicada ao README |
| [`font-licenses/`](font-licenses/) | Licenças das fontes incorporadas |
| [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) | Créditos e limites de licenciamento |

## Validação desta entrega

- Sintaxe dos scripts e integridade dos recursos incorporados.
- Referências entre telas e tecnologias.
- Navegação e tipografia verificadas na prévia do navegador.
- Preservação das demonstrações e dos critérios do briefing anterior.

---

<div align="center">

**BioGeoLab** · Projeto de [Bruno Michel Pera](https://github.com/perabru)

Briefing técnico · Documentação em português · 2026

</div>
