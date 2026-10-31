# Trilha de estudos - BioGeoLab

Da grandeza física à evidência medida.

Fevereiro a julho de 2027. 88 horas estimadas de leitura e prática; não é a estimativa total do produto. O progresso fica no navegador e tem backup próprio na aba Trilha de estudos.

[Baixar kit de exercícios](../materiais/kit-estudos-esp32.zip)

## E01 - Definir a medição e seu protocolo

2027-02-01 a 2027-02-07 | 8 h | Base

Base recomendada: início da trilha.

**Aprender:** Git; Grandeza; Unidade; Amostragem; Calibração.

**Prática:** Definir pergunta, faixa, montagem e referência. Distinguir ensaio de aceleração, ambiente e espectroscopia.

**Conferir:**
- [ ] Grandeza definida
- [ ] Referência citada
- [ ] Protocolo versionado

**Fontes:**
- [Pro Git em português](https://git-scm.com/book/pt-br/v2) - Git / autores do Pro Git | PT-BR | Leitura gratuita. Commits, branches, revisão e recuperação do trabalho.
- [ADXL355: produto e datasheet](https://www.analog.com/en/products/adxl355.html) - Analog Devices | EN | Leitura gratuita. Faixa, ODR, filtro, ruído, SPI e montagem do acelerômetro.
- [ESP32 Feather V2: guia da placa](https://learn.adafruit.com/adafruit-esp32-feather-v2) - Adafruit | EN | Leitura gratuita. Pinagem, alimentação e interfaces da placa de referência.

Entregas: P01, P02.

Arquivos: [bom.csv](../materiais/bom.csv), [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## E02 - Programar a placa e ler interfaces

2027-02-08 a 2027-02-21 | 12 h | Base

Base recomendada: E01.

**Aprender:** ESP-IDF; C e C++; FreeRTOS; SPI; I2C.

**Prática:** Compilar o exercício de relógio e saída serial no ESP32 clássico e depois mapear o driver específico dos sensores reais.

**Conferir:**
- [ ] Pinagem conferida
- [ ] Leitura identificada
- [ ] Falha de sensor tratada

**Fontes:**
- [ESP-IDF: guia de programação](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/) - Espressif | EN | Leitura gratuita. Instalação, compilação, FreeRTOS, periféricos e exemplos oficiais.
- [ESP32 Feather V2: guia da placa](https://learn.adafruit.com/adafruit-esp32-feather-v2) - Adafruit | EN | Leitura gratuita. Pinagem, alimentação e interfaces da placa de referência.
- [BME280: datasheet do fabricante](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf) - Bosch Sensortec | EN | Leitura gratuita. Tensões, registradores, interfaces e limites do sensor.

Entregas: P02, P03, P05.

Arquivos: [firmware/main/main.c](../materiais/firmware/main/main.c), [firmware/README.md](../materiais/firmware/README.md).

## E03 - Registrar aceleração com tempo e unidade

2027-02-22 a 2027-03-07 | 12 h | Aplicação

Base recomendada: E02.

**Aprender:** ADXL355; ODR; Fila; Timestamp; Perdas.

**Prática:** Usar dados sintéticos para medir taxa efetiva e perdas antes de comparar com aquisição do ADXL355.

**Conferir:**
- [ ] Taxa medida
- [ ] Unidade declarada
- [ ] Perda registrada

**Fontes:**
- [ADXL355: produto e datasheet](https://www.analog.com/en/products/adxl355.html) - Analog Devices | EN | Leitura gratuita. Faixa, ODR, filtro, ruído, SPI e montagem do acelerômetro.
- [ESP-IDF: guia de programação](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/) - Espressif | EN | Leitura gratuita. Instalação, compilação, FreeRTOS, periféricos e exemplos oficiais.

Entregas: P05, P06.

Arquivos: [sinais_demo.csv](../materiais/sinais_demo.csv), [analisar_sinal.py](../materiais/analisar_sinal.py).

## E04 - Gravar sessão em SD e recuperar falhas

2027-03-08 a 2027-03-28 | 10 h | Aplicação

Base recomendada: E03.

**Aprender:** SDSPI; FATFS; Blocos; Cabeçalho; Integridade.

**Prática:** Desenhar arquivo de sessão e testar ausência de cartão, espaço esgotado e interrupção de energia no protocolo.

**Conferir:**
- [ ] Cabeçalho conhecido
- [ ] Falha registrada
- [ ] Arquivo recuperado

**Fontes:**
- [ESP-IDF: driver SD SPI](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/peripherals/sdspi_host.html) - Espressif | EN | Leitura gratuita. Gravação em cartão, barramento compartilhado e tratamento de erro.
- [ESP-IDF: guia de programação](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/) - Espressif | EN | Leitura gratuita. Instalação, compilação, FreeRTOS, periféricos e exemplos oficiais.

Entregas: P06, P07.

Arquivos: [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## E05 - Analisar ruído, RMS e espectro

2027-03-29 a 2027-04-18 | 12 h | Aplicação

Base recomendada: E04.

**Aprender:** Amostragem; Nyquist; RMS; DFT; Welch.

**Prática:** Calcular a frequência dominante do sinal sintético e repetir a análise com janelas do método de Welch.

**Conferir:**
- [ ] Frequência de amostragem
- [ ] Unidade do espectro
- [ ] Parâmetros registrados

**Fontes:**
- [NumPy para começar](https://numpy.org/doc/stable/user/absolute_beginners.html) - NumPy | EN | Leitura gratuita. Arrays, eixos, máscaras e operações vetorizadas.
- [SciPy: espectro pelo método de Welch](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.welch.html) - SciPy | EN | Leitura gratuita. Frequência de amostragem, janelas e densidade espectral de potência.

Entregas: P09, P14.

Arquivos: [analisar_sinal.py](../materiais/analisar_sinal.py), [sinais_demo.csv](../materiais/sinais_demo.csv).

## E06 - Integrar ambiente e espectroscopia

2027-04-19 a 2027-05-16 | 12 h | Aplicação

Base recomendada: E05.

**Aprender:** BME280; Referência; CSV espectral; Picos; Rastreabilidade.

**Prática:** Importar o espectro sintético, calcular o pico e escrever o limite da interpretação sem atribuir diagnóstico.

**Conferir:**
- [ ] Origem do espectro
- [ ] Comprimento de onda
- [ ] Referência de método

**Fontes:**
- [BME280: datasheet do fabricante](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf) - Bosch Sensortec | EN | Leitura gratuita. Tensões, registradores, interfaces e limites do sensor.
- [NumPy para começar](https://numpy.org/doc/stable/user/absolute_beginners.html) - NumPy | EN | Leitura gratuita. Arrays, eixos, máscaras e operações vetorizadas.

Entregas: P10, P11, P12.

Arquivos: [espectro_demo.csv](../materiais/espectro_demo.csv), [analisar_espectro.py](../materiais/analisar_espectro.py).

## E07 - Conectar painel, gabinete e operação

2027-05-17 a 2027-05-30 | 12 h | Validação

Base recomendada: E06.

**Aprender:** API; Wi-Fi; Buffer; CAD; Energia e custo.

**Prática:** Concluir o percurso aquisição → arquivo → painel e validar a montagem rígida e a sessão com outra pessoa.

**Conferir:**
- [ ] Sessão reproduzida
- [ ] Reconexão registrada
- [ ] BOM revisada

**Fontes:**
- [FastAPI: tutorial guiado](https://fastapi.tiangolo.com/tutorial/) - FastAPI | EN | Leitura gratuita. Rotas, validação, dependências e respostas de API.
- [React: primeiros componentes](https://react.dev/learn) - React | EN | Leitura gratuita. Estado, componentes, eventos e listas.
- [Documentação do FreeCAD](https://github.com/FreeCAD/FreeCAD-documentation) - FreeCAD | EN | Leitura gratuita. Modelagem paramétrica, unidades, montagem e exportação.
- [Playwright: primeiros testes](https://playwright.dev/docs/intro) - Playwright / Microsoft | EN | Leitura gratuita. Testes do percurso do usuário e evidências de falha.

Entregas: P04, P08, P13, P16, P17.

Arquivos: [bom.csv](../materiais/bom.csv), [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## E08 - Transformar evidências em monografia e artigo

2027-06-01 a 2027-07-16 | 10 h | Validação

Base recomendada: E07.

**Aprender:** Busca e fichamento; Método reproduzível; Figuras e tabelas; Citações e referências; Modelo INIC.

**Prática:** Preencher a matriz de referências, redigir um resultado sustentado pelos dados e fechar o primeiro texto integral do artigo em junho.

**Conferir:**
- [ ] Cada número tem origem
- [ ] Referências revisadas
- [ ] Modelo do evento conferido

**Fontes:**
- [Zotero: guia inicial](https://www.zotero.org/support/quick_start_guide) - Zotero | EN | Leitura gratuita. Coleções, metadados, citações e biblioteca compartilhada.
- [Normas e guias de normalização](https://biblioteca.ufes.br/normalizacao) - Sistema Integrado de Bibliotecas / UFES | PT-BR | Leitura gratuita. Conferir normas de apresentação, citações, referências e resumos.
- [INIC: modelo e submissão](https://www.univap.br/inic/submissao_trabalhos.php) - UNIVAP / INIC | PT-BR | Leitura gratuita. Consultar o modelo da edição de 2027 quando divulgado. A consulta atual identifica 2026.

Entregas: M08, M13, M15, A01, A05, A09.

Arquivos: [matriz_referencias.csv](../materiais/matriz_referencias.csv), [protocolo_experimento.md](../materiais/protocolo_experimento.md).

## Hardware e recursos de bancada

| Item | Quantidade | Uso | Etapa / observação |
| --- | --- | --- | --- |
| ESP32 Feather V2 ou placa equivalente validada | 1 | Controle de aquisição e transmissão | Essencial. O exercício de ADC assume ESP32 clássico. Revalidar pinos em outra placa. |
| ADXL355 em módulo adequado, referência EVAL-ADXL355-PMDZ | 1 | Aceleração em três eixos | Sensor principal. Conferir alimentação e interface; montagem rígida e configuração fazem parte da medição. |
| Módulo microSD e cartão | 1 | Gravação local | Essencial. 32 GB é previsão de projeto, não requisito do exercício. |
| RTC e alimentação compatível | 1 | Referência temporal em campo | Proposto. Registrar modelo, sincronização e descontinuidades; comparar com relógio monotônico. |
| BME280 em breakout compatível | 1 | Temperatura, pressão e umidade | Expansão.  |
| Base rígida, gabinete e fixadores | 1 conjunto | Acoplamento e proteção de montagem | Essencial.  |
| Cabo USB, multímetro e alimentação regulada | 1 conjunto | Montagem e ensaios elétricos | Essencial.  |
| Espectrômetro comercial e fonte óptica protegida | Conforme protocolo | Aquisição de espectro no laboratório | Laboratório. Começar pelos CSV sintéticos. Montagem óptica e eventual laser exigem o protocolo supervisionado do laboratório. |

## Drive de Pobre: consulta registrada

[Drive de Pobre](https://drivedepobre.com/) | 31/10/2026 | Consulta bloqueada por verificação humana

O catálogo exigiu verificação humana nesta consulta. Nenhum curso ou arquivo do acervo foi validado ou redistribuído. Use os termos como roteiro de busca e confira autoria e permissão na origem. Os materiais desta trilha estão ligados diretamente às fontes e aos exercícios do projeto.

Termos de busca: eletrônica, ESP32, processamento de sinais, espectroscopia.

## Uso dos arquivos

Os exercícios e dados do kit são autorais e sintéticos. Fontes externas permanecem no endereço do autor. Conferir versão, autoria e permissão antes de reutilizar material externo. A aplicação não depende do catálogo para abrir os recursos da trilha.
