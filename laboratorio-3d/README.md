# BioGeoLab · Laboratório 3D

Página estática de construção, montagem e funcionamento com modelos educativos originais e inspeção de conexões.

[Abrir laboratório](https://perabru.github.io/biogeolab-esp32/laboratorio-3d/)

## Arquivos

- `index.html`: guia completo, acessível também quando WebGL não está disponível.
- `content.json`: etapas, materiais, conexões, testes e referências.
- `models.js`: peças e pontos de conexão em Three.js.
- `viewer.js`: rotação, zoom, seleção, vista desmontada, rótulos e captura PNG.
- `style.css`: apresentação responsiva com a identidade do projeto.
- `vendor/`: Three.js r170 e OrbitControls distribuídos sob a licença MIT incluída.

## Executar localmente

Use um servidor HTTP na raiz do repositório, por exemplo `python -m http.server 8000`, e acesse `http://localhost:8000/laboratorio-3d/`. A abertura por `file://` não permite carregar módulos JavaScript em todos os navegadores.

## Controles

Arraste para girar, use a roda ou gesto de pinça para aproximar e selecione peças na cena ou na lista. O controle de desmontagem separa os componentes e mantém as ligações presas aos respectivos pontos. A página inclui vista frontal, lateral e superior, isolamento de peças, nomes, giro automático, tela cheia e captura PNG. Com foco no canvas: setas para girar, +/− para zoom, E para montar/desmontar e 0 para enquadrar.

O roteiro salva apenas as marcações de etapas neste navegador. Nenhuma informação é enviada a um servidor por este laboratório.

O renderizador principal usa WebGL 2. Quando a aceleração gráfica não está disponível, a mesma geometria é desenhada em Canvas 2D com projeção 3D; os controles permanecem funcionais, com menor taxa de quadros.

## Precisão do modelo

Referência proposta: Adafruit ESP32 Feather V2, EVAL-ADXL355-PMDZ, microSD SPI e expansões RTC/BME280. A cena é uma reconstrução didática aproximada; pinagem e tensão devem ser conferidas na revisão adquirida. Espectroscopia usa instrumento externo e protocolo próprio; o ESP32 não realiza identificação química ou clínica sozinho. As formas internas são aproximações educativas documentadas nas fontes de modelagem. Não são CAD oficial de fabricante, projeto certificado, gerber de PCB ou arquivo pronto para impressão/fabricação.

## Atualizar

Mantenha a tabela de conexões, os pontos em `models.js` e o conteúdo em `content.json` coerentes. Ao editar o conteúdo, atualize também o HTML estático. Os IDs de partes são estáveis e ligam o modelo às etapas.
