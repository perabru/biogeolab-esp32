# Inventário de telas · BioGeoLab

26 telas e seus critérios de aceite.

## B01 · Plataforma e módulos

`/` · Público

Explicar o núcleo e as expansões.

- **Campos:** Estação; Laboratório; Sensores; Cursos.
- **Ações:** Explorar; Ver limites.
- **Estados:** Módulo conceitual; Sem documentação.
- **API:** `GET /v1/public/project`
- **Aceite:** Distinguir equipamento montado, referência e expansão.

## B02 · Estação 3D e montagem

`/estacao/estrutura` · Engenharia

Inspecionar caixa, base e módulos.

- **Campos:** Placas; SD; RTC; Bateria; Fixações.
- **Ações:** Girar; Explodir; Ver BOM.
- **Estados:** Dimensão pendente; Encaixe não verificado.
- **API:** `GET /v1/assemblies/:id`
- **Aceite:** Modelo não substitui ensaio de montagem nem representa Raman dentro da caixa.

## B03 · Conectar e identificar estação

`/estacao/conectar` · Operação

Escolher equipamento com versão visível.

- **Campos:** ID; Rede; Firmware; Montagem.
- **Ações:** Conectar; Testar; Encerrar.
- **Estados:** Rede perdida; ID inesperado.
- **API:** `GET /v1/stations · POST /v1/connections`
- **Aceite:** Não unir pacotes de duas estações na mesma sessão.

## B04 · Autoteste e prontidão

`/estacao/check` · Operação

Conferir sensor, cartão, tempo e energia.

- **Campos:** Sensor; SD; RTC; Bateria.
- **Ações:** Testar; Registrar falha.
- **Estados:** Cartão ausente; Relógio inválido; Falha SPI.
- **API:** `POST /v1/stations/:id/self-test`
- **Aceite:** Falha é explícita antes da coleta e não recebe valor sintético substituto.

## B05 · Configurar aquisição

`/estacao/config` · Operação

Registrar parâmetros usados na sessão.

- **Campos:** ODR; Faixa; Filtro; Eixos; Origem do tempo.
- **Ações:** Validar; Aplicar; Ler confirmação.
- **Estados:** Configuração não suportada; ACK ausente.
- **API:** `PUT /v1/stations/:id/config`
- **Aceite:** Guardar configuração efetiva, não apenas a solicitada.

## B06 · Sismograma triaxial

`/aquisicao/ao-vivo` · Operação

Acompanhar aceleração e qualidade.

- **Campos:** X; Y; Z; mg; seq; Taxa efetiva.
- **Ações:** Pausar vista; Marcar evento.
- **Estados:** Stale; Perdas; Saturação.
- **API:** `WS /v1/acquisition`
- **Aceite:** Pausa visual não interrompe coleta sem comando explícito.

## B07 · Eventos de vibração

`/aquisicao/eventos` · Operação

Marcar ocorrências sem atribuir origem automática.

- **Campos:** Horário; Pico; Contexto; Operador.
- **Ações:** Anotar; Recortar; Revisar.
- **Estados:** Sem contexto; Falso disparo.
- **API:** `POST /v1/events`
- **Aceite:** Vibração não recebe rótulo de terremoto ou magnitude sem método validado.

## B08 · Sessões e reabertura

`/sessoes` · Operação

Comparar aquisições com suas versões.

- **Campos:** Data; Ponto; Montagem; Firmware.
- **Ações:** Abrir; Filtrar; Comparar.
- **Estados:** Parcial; Arquivo ausente.
- **API:** `GET /v1/sessions`
- **Aceite:** Toda sessão conserva unidade e origem do tempo.

## B09 · Cartão e arquivos brutos

`/estacao/armazenamento` · Operação

Conferir gravação independente da rede.

- **Campos:** Espaço; Arquivos; Checksum; Erros.
- **Ações:** Verificar; Baixar; Fechar sessão.
- **Estados:** Cheio; Falha de escrita; Removido.
- **API:** `GET /v1/stations/:id/files`
- **Aceite:** Não marcar salvo antes da confirmação de escrita.

## B10 · Fila offline e sincronização

`/sincronizar` · Operação

Conferir blocos locais e recebidos.

- **Campos:** Pendentes; seq; Checksums; Conflitos.
- **Ações:** Sincronizar; Repetir; Resolver.
- **Estados:** Rede ausente; Bloco corrompido.
- **API:** `POST /v1/blocks/sync`
- **Aceite:** Deduplicar por estação, sessão e sequência; não apagar original antes da confirmação.

## B11 · RMS, FFT e PSD

`/analise/sinais` · Análise

Inspecionar conteúdo temporal e espectral.

- **Campos:** Janela; Filtro; fs; Unidade; PSD.
- **Ações:** Processar; Comparar bruto.
- **Estados:** Aliasing; Poucas amostras; Gap.
- **API:** `POST /v1/signal-runs`
- **Aceite:** Registrar parâmetros e não preencher lacuna como medição.

## B12 · Tempo, perdas e calibração

`/analise/qualidade` · Análise

Medir qualidade real da aquisição.

- **Campos:** Intervalos; Drift; Orientação; Referência.
- **Ações:** Executar ensaio; Registrar.
- **Estados:** Taxa instável; Sem referência.
- **API:** `POST /v1/calibration-runs`
- **Aceite:** Relatar taxa efetiva, condição e incerteza; meta não vira resultado.

## B13 · Campanhas e pontos

`/campo/campanhas` · Campo

Definir locais e procedimento de campo.

- **Campos:** Ponto; Base; Orientação; Data; Equipe.
- **Ações:** Criar; Planejar; Encerrar.
- **Estados:** Sem protocolo; Instalação alterada.
- **API:** `GET/POST /v1/campaigns`
- **Aceite:** Comparação entre pontos conserva condições e não presume causalidade.

## B14 · Cadastro de amostras ambientais

`/amostras/nova` · Campo

Identificar matriz e rastreabilidade.

- **Campos:** Código; Água/solo/vegetação; Origem; Responsável.
- **Ações:** Cadastrar; Etiquetar.
- **Estados:** Código duplicado; Dados faltantes.
- **API:** `POST /v1/samples`
- **Aceite:** Sem dados de pacientes; etiqueta física corresponde ao ID digital.

## B15 · Integridade e encaminhamento

`/amostras/:id` · Campo

Acompanhar recebimento e desvios.

- **Campos:** Condição; Histórico; Método; Destino.
- **Ações:** Aceitar; Rejeitar; Encaminhar.
- **Estados:** Integridade comprometida; Método ausente.
- **API:** `POST /v1/samples/:id/transfers`
- **Aceite:** Desvio permanece registrado e não é ocultado na análise.

## B16 · Importar espectro externo

`/laboratorio/importar` · Laboratório

Associar arquivo do instrumento à amostra.

- **Campos:** CSV/TXT; Amostra; Eixo; Instrumento; Método.
- **Ações:** Validar; Importar.
- **Estados:** Estrutura inválida; Unidade ausente.
- **API:** `POST /v1/spectra`
- **Aceite:** Conferir ID da amostra e preservar o arquivo bruto.

## B17 · Comparar e processar espectros

`/laboratorio/espectros/:id` · Laboratório

Revisar curvas com referência apropriada.

- **Campos:** Bruto; Baseline; Normalização; Referência.
- **Ações:** Comparar; Registrar etapa.
- **Estados:** Fluorescência; Referência incompatível.
- **API:** `POST /v1/spectral-runs`
- **Aceite:** Curva sintética ou pico isolado não confirma substância.

## B18 · Sensores e expansões

`/engenharia/modulos` · Engenharia

Distinguir núcleo e módulos ainda não definidos.

- **Campos:** ADXL355; BME280; Sondas; Instrumento externo.
- **Ações:** Avaliar; Documentar; Aprovar integração.
- **Estados:** Sem interface; Sem método; Não validado.
- **API:** `GET/POST /v1/modules`
- **Aceite:** BME280 mede contexto do ar; não recebe função de pH ou umidade do solo.

## B19 · Energia e autonomia

`/engenharia/energia` · Engenharia

Medir consumo no perfil de operação real.

- **Campos:** Corrente; Bateria; Carga; Condição.
- **Ações:** Registrar ensaio; Comparar.
- **Estados:** Sem medição; Bateria incompatível.
- **API:** `POST /v1/power-tests`
- **Aceite:** Autonomia vem de ensaio e não do percentual simulado da interface.

## B20 · Seis cursos e evidências

`/equipes` · Gestão

Relacionar responsabilidades à mesma versão.

- **Campos:** Curso; Entrega; Responsável; Critério.
- **Ações:** Atribuir; Revisar; Anexar prova.
- **Estados:** Parcial; Pendente; Bloqueado.
- **API:** `GET/POST /v1/deliverables`
- **Aceite:** Troca de sensor atualiza firmware, custo, documentação e divulgação.

## B21 · Materiais, operação e manutenção

`/gestao/recursos` · Gestão

Planejar componentes, laboratório e suporte.

- **Campos:** BOM; Disponível/proposto; Custo; Manutenção.
- **Ações:** Orçar; Priorizar; Agendar.
- **Estados:** Instrumento indisponível; Cotação vencida.
- **API:** `GET/POST /v1/resources`
- **Aceite:** Separar recurso existente de aquisição proposta e ensaio realizado.

## B22 · Relatório e pacote de dados

`/relatorios` · Gestão

Reproduzir a sessão, método e interpretação.

- **Campos:** Bruto; Processado; Manifesto; Limites.
- **Ações:** Exportar; Imprimir; Congelar.
- **Estados:** Arquivo incompleto; Revisão pendente.
- **API:** `POST /v1/reports`
- **Aceite:** Sem diagnóstico clínico, teste de potabilidade ou previsão sísmica por inferência.

## B23 · Entrar e criar conta

`/conta/entrar` · Conta

Identificar a pessoa antes de abrir recursos privados.

- **Campos:** Nome público; E-mail; Retorno autorizado.
- **Ações:** Entrar via OIDC; Criar conta; Sair.
- **Estados:** E-mail não confirmado; Sessão expirada; Acesso recusado.
- **API:** `GET /auth/login · GET /auth/callback`
- **Aceite:** Nunca aceitar uma URL de retorno externa sem validação; nenhum token no armazenamento local.

## B24 · Verificação e recuperação de acesso

`/conta/recuperar` · Conta

Concluir verificação e redefinição pelo provedor de identidade.

- **Campos:** Solicitação; Expiração; Estado do link.
- **Ações:** Pedir novo link; Confirmar e-mail; Definir senha no provedor.
- **Estados:** Link expirado; Uso anterior; Limite de tentativas.
- **API:** `Fluxos de ação do Keycloak`
- **Aceite:** Respostas de recuperação não revelam se um endereço está cadastrado.

## B25 · Perfil e preferências

`/conta/perfil` · Conta

Editar os próprios dados e preferências de uso.

- **Campos:** Nome; Idioma; Preferências; Sessões.
- **Ações:** Salvar; Encerrar sessão; Solicitar exportação.
- **Estados:** Erro de validação; Sem conexão; Alteração pendente.
- **API:** `GET/PATCH /v1/me`
- **Aceite:** Uma conta nunca consulta o perfil privado de outra alterando um ID.

## B26 · Equipe, acessos e auditoria

`/gestao/equipe` · Gestão

Vincular pessoas ao escopo correto e registrar mudanças.

- **Campos:** Pessoa; Papel; Projeto; Convites; Histórico.
- **Ações:** Convidar; Revogar; Consultar alterações.
- **Estados:** Convite vencido; Sem permissão; Último responsável.
- **API:** `GET/POST /v1/members · GET /v1/audit`
- **Aceite:** Revogação vale no servidor; manter pelo menos um responsável e trilha de alteração.
