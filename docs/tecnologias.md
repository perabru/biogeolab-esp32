# Tecnologias propostas

O HTML do briefing usa JavaScript e CSS nativos. A stack abaixo descreve o produto a desenvolver.

### React + TypeScript + Vite

Uma interface com contratos tipados e componentes reaproveitáveis.

- **Onde entra:** Aplicativo web responsivo; UI com CSS próprio e primitivas Radix.
- **Contrato:** Estados de carregamento, vazio, falha e foco visível em todas as rotas.
- [Documentação](https://react.dev/)

### Python + FastAPI + Pydantic

Validar entradas e publicar contratos REST/OpenAPI.

- **Onde entra:** Servidor da aplicação; processamento pesado fora da requisição.
- **Contrato:** IDs obtidos da sessão; validação, paginação e erros legíveis.
- [Documentação](https://fastapi.tiangolo.com/)

### PostgreSQL + SQLAlchemy + Alembic

Relacionar registros, versões, permissões e auditoria.

- **Onde entra:** Banco transacional; migrações versionadas.
- **Contrato:** Chaves únicas, transações, backup e restauração testada.
- [Documentação](https://www.postgresql.org/docs/)

### Keycloak + OIDC + sessão no servidor

Reutilizar identidade, verificação de e-mail, recuperação e MFA da equipe.

- **Onde entra:** BFF Python com Authlib; JWT verificado na API.
- **Contrato:** Cookie HttpOnly/Secure/SameSite; CSRF; papéis e propriedade conferidos no servidor.
- [Documentação](https://www.keycloak.org/securing-apps/oidc-layers)

### S3 compatível + checksums

Guardar originais e derivados sem transformar o banco em repositório de mídia.

- **Onde entra:** Armazenamento privado por projeto e URLs temporárias.
- **Contrato:** Chaves e permissões geradas no servidor; tamanho, MIME e integridade validados.
- [Documentação](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

### Redis + Celery

Executar importações e análises demoradas sem bloquear a tela.

- **Onde entra:** Workers separados da API com fila e status persistido.
- **Contrato:** Tarefa identificada por arquivo/versão; repetição idempotente e cancelamento cooperativo.
- [Documentação](https://docs.celeryq.dev/)

### Linux + Docker Compose + Caddy

Reproduzir o piloto e servir a interface por HTTPS.

- **Onde entra:** Ambientes de desenvolvimento, homologação e piloto separados.
- **Contrato:** Segredos fora do repositório, volumes persistentes e recuperação documentada.
- [Documentação](https://docs.docker.com/compose/)

### Git + CI + pytest + Vitest + Playwright

Verificar cálculo, contrato e percurso completo antes da entrega.

- **Onde entra:** Testes de API Python, componentes e navegador.
- **Contrato:** Versões fixadas no lockfile; testes de falha, autorização e retomada.
- [Documentação](https://playwright.dev/docs/intro)

### OpenTelemetry + Prometheus + Grafana

Observar recepção, latência, falhas e consumo.

- **Onde entra:** Instrumentação no servidor, métricas dos workers e logs estruturados.
- **Contrato:** Sem credenciais nos logs; alertas acionáveis e registro das interrupções.
- [Documentação](https://opentelemetry.io/docs/languages/python/)

### ADXL355 + SPI + driver versionado

Registrar aceleração X/Y/Z com configuração conhecida.

- **Onde entra:** Sensor preso à base rígida; referência EVAL-ADXL355-PMDZ.
- **Contrato:** Registrar faixa, ODR, filtro e orientação; 20 bits de conversão não garantem exatidão do conjunto.
- [Documentação](https://www.analog.com/en/products/adxl355.html)

### ESP-IDF + C++ + FreeRTOS

Separar aquisição, gravação e transmissão em tarefas com buffers.

- **Onde entra:** Firmware da placa ESP32 escolhida; Feather ESP32 V2 é referência anterior.
- **Contrato:** Medir taxa efetiva, fila e perdas; meta de 250 Hz não é resultado comprovado.
- [Documentação](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/)

### microSD + FATFS + SDSPI

Preservar dados mesmo sem Wi-Fi.

- **Onde entra:** Escrita em blocos com cabeçalho de sessão e fechamento verificável.
- **Contrato:** Testar cartão ausente/cheio, interrupção e integridade; cartão de 32 GB é previsão.
- [Documentação](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/peripherals/sdspi_host.html)

### RTC + relógio monotônico + sincronização

Associar amostras a tempo sem esconder descontinuidades.

- **Onde entra:** RTC de referência PCF8523 e índice de amostra no firmware.
- **Contrato:** Guardar origem do UTC, drift e reinício; horário de recepção não substitui o de aquisição.
- [Documentação](https://www.adafruit.com/product/2922)

### Wi-Fi local + gateway HTTP/WebSocket

Acompanhar o equipamento e recuperar arquivos da sessão.

- **Onde entra:** Modo local inicialmente; gateway autentica e repassa blocos à API.
- **Contrato:** Perder Wi-Fi não implica parar SD; não bloquear aquisição esperando rede.
- [Documentação](https://docs.espressif.com/projects/esp-idf/en/stable/esp32/api-reference/protocols/esp_http_server.html)

### NumPy + SciPy + Plotly.js

Calcular e visualizar RMS, série e espectro.

- **Onde entra:** Análise no computador/gateway; exibir bruto e processado separadamente.
- **Contrato:** Registrar janela, filtro, frequência de amostragem e unidade; pico não identifica terremoto.
- [Documentação](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.welch.html)

### Importador CSV/TXT + referência de método

Vincular espectro externo e amostra sem inventar conexão com GPIO.

- **Onde entra:** Equipamento de referência i-Raman Plus 785S / SpecSuite, fora da maleta.
- **Contrato:** Preservar bruto, eixo cm⁻¹, intensidade, configuração e controles; validar estrutura do arquivo real.
- [Documentação](https://www.metrohm.com/content/dam/metrohm/shared/documents/manuals/89/89558001EN.pdf)

### BME280 e interfaces de expansão

Adicionar contexto ambiental sem confundir modalidades.

- **Onde entra:** BME280 como opção para temperatura, umidade relativa e pressão do ar.
- **Contrato:** Sondas de pH/EC/turbidez/solo não estão definidas; cada uma exige hardware, calibração e método.
- [Documentação](https://www.bosch-sensortec.com/products/environmental-sensors/humidity-sensors-bme280/)

### FreeCAD + BOM + impressão 3D

Revisar portabilidade, fixação e acessos.

- **Onde entra:** Gabinete anterior de 180 × 130 × 64 mm é envelope conceitual.
- **Contrato:** Conferir folgas, massa, base rígida, proteção da bateria e ensaios; nenhuma resistência ambiental presumida.
- [Documentação](https://www.freecad.org/)
