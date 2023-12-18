# Aplicativo de Licenciamento Sanitário em Recife

Este é um aplicativo React Native que utiliza a API de Licenciamento Sanitário da Prefeitura do Recife para exibir informações sobre licenciamentos sanitários na região. O aplicativo também utiliza a localização do usuário para destacar a sua posição no mapa e encontrar o licenciamento sanitário mais próximo.

## Funcionalidades

- **Mapa Interativo:** Exibe um mapa interativo usando a biblioteca `react-native-maps`, marcando a localização do usuário, os licenciamentos sanitários disponíveis e o licenciamento sanitário mais próximo.

- **Legendas:** Fornece legendas no canto superior esquerdo do mapa para indicar o significado das marcações no mapa, como licenciamentos, localização atual e o licenciamento mais próximo.

- **Localização Atual:** Utiliza a API de localização do dispositivo para determinar a localização atual do usuário.

- **Licenciamento Mais Próximo:** Calcula e destaca no mapa o licenciamento sanitário mais próximo com base na localização do usuário.

## Como Usar

1. **Instalação:**
   - Certifique-se de ter o ambiente de desenvolvimento React Native configurado em seu sistema.
   - Execute `npm install` para instalar as dependências.

2. **Execução:**
   - Execute o aplicativo em um emulador ou dispositivo usando `npx react-native run-android` ou `npx react-native run-ios`.

3. **Mapa e Localização:**
   - Ao iniciar o aplicativo, será solicitada permissão para acessar a localização do dispositivo.
   - O mapa será centrado na localização atual do usuário, exibindo marcadores para os licenciamentos sanitários disponíveis e destacando o mais próximo.

4. **Legendas:**
   - No canto superior esquerdo do mapa, você encontrará legendas indicando o significado das marcações no mapa.

## API de Dados Recife

O aplicativo utiliza a API de Licenciamento Sanitário da Prefeitura do Recife para obter informações sobre os licenciamentos sanitários na região. A API é acessada através da URL `http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=6bb70e99-b7b9-4b2a-a213-adc757e3337a` e os dados são exibidos no mapa.
