<h1 align="center">
  <br>
  <a href="https://github.com/geocine/phaser3-rollup-typescript#readme"><img src="https://i.imgur.com/6lcIxDs.png" alt="header" width="600"/></a>
  <br>
  CatGame
  <br>
</h1>
Jogo desenvolvido para a disciplina de Linguagens de Programação, no período 2021/1 na Universidade Federal do Espírito Santo (UFES)

## Sobre o jogo
O jogo consiste em um twin stick shooter tematizado ao redor do [Nyan Cat](https://www.youtube.com/watch?v=QH2-TGUlwu4) (bem vindo de volta a 2011!). Pilote a nave de torrada do Nyan Cat, destrua os gatinhos rivais que querem comer a sua nave e sobreviva o maior tempo possível!

## Executando o jogo
Você pode jogar online [aqui](https://pietroluongo.github.io/). De maneira alternativa é possível executar os seguintes comandos para rodar o jogo:
```
git clone https://github.com/pietroluongo/catgame.git
cd catgame
yarn install
yarn build
yarn serve
```
E acessar pela URL [localhost:5000](https://localhost:5000).

## Controles
Você pode se mover com `WASD`, similar ao controle nas setas do teclado. Para mirar, use o seu `mouse`. A `barra de espaço` permite aplicar um freio fraco, quando necessário. Note que a maior parte do poder de frenagem da nave é associada puramente à aceleração em outra direção. O `botão esquerdo do mouse` dispara (tenha em mente que seu projétil é um corpo físico, então você terá de mirar um pouco à frente dos inimigos). O botão `TAB` abre o menu de upgrades, conforme explicado abaixo, e o botão `ESC` pausa o jogo. Você pode usar a combinação `CTRL+R` para reiniciar o jogo, caso perca.

## Mecânicas de jogo
### Upgrades
O jogo conta com um sistema de upgrades apertando a tecla TAB. Com isso, é possível gastar alguns dos pontos obtidos melhorando alguns aspectos da nave do Nyan Cat.
### Drops
A luta fica mais fácil com alguns drops obtidos ao derrotar inimigos. O drop de "Catnip" restaura instantaneamente parte da sua vida. Mas fique de olho, porque eles desaparecem rapidamente!
### Dificuldade
O jogo é estruturado em rounds (rodadas), e a cada rodada os inimigos ficam mais fortes. Assim, tenha certeza que está investindo seus pontos em upgrades! Caso contrário, certamente o Nyan Cat não terá chance nenhuma contra as hordas de gatinhos...
## Estrutura do código
O código é modularizado a partir de alguns conceitos básicos associados ao Phaser3: Cenas e Scripts
### Cenas
- `Game.ts`: Cena principal do jogo. Consiste em toda a lógica associada às regras do jogo em si;
- `PauseScene.ts`: Cena de UI de pausa. Apenas pausa a cena principal;
- `UIScene.ts`: Cena de UI principal. Constrói os componentes na tela, como o minimapa e os textos de vida e pontuação;
- `UpgradeScene.ts`: Cena de UI de upgrades. Extremamente similar à cena de pausa, mas permite que o jogador realize upgrades na nave; 
### Scripts
- `barrier`: Constrói as barreiras do mapa a partir de um tileset fornecido como parâmetro. Permite a construção de barreiras de tamanhos arbitrários com tiling correto
- `droppable`: Classe base dos drops do jogo. Outros drops que são gerados a partir de inimigos devem estender essa classe.
- `enemy`: Classe dos inimigos do jogo. Extendem `flyingObject`, e contam com a lógica de controle e ciclo de vida dos inimigos em si.
- `flyingObject`: Classe base dos componentes voadores. Contém alguma lógica geral a qual qualquer objeto voador está restrito.
- `healthpack`: Classe dos drops de vida. Extende a lógica de `droppable`, mas implementa a cura do usuário.
- `map`: Conjunto de instruções para carregamento do mapa no formato `.svg`.
- `player`: Classe do jogador. Extende `flyingObject`, e conta com toda a lógica de controle, vida, física e outros aspectos associados diretamente ao jogador.
- `projectile`: Classe que implementa a lógica de projéteis no jogo. Usada por tanto o jogador quanto os inimigos, permite que parâmetros dos projéteis sejam controlados, tais como velocidade inicial, tamanho, dentre outros.
- `spawner`: Implementa a lógica de criação (spawn) de inimigos no jogo a partir do arquivo de mapa. No arquivo de mapa, círculos são tratados como áreas de spawn, e o jogo cria inimigos dentro dessas áreas. Esse arquivo rege essa lógica.
- `ui/upgradeItem`: Implementa o componente de upgrade do menu de upgrades. Os dados são obtidos através do jogador armazenado na cena de upgrades.

## Utilidades
### Editor de mapa
Você pode criar seus próprios mapas para o jogo! Basta salvar um arquivo com a extensão `.svg` em `/public/assets/maps` (há alguns arquivos de exemplo nessa pasta), e ajustar qual mapa é carregado em `/src/utils`, alterando a constante `CURRENT_MAP`. De fato, use isso pra jogar outros mapas além do mapa padrão! 😁
### Acessibilidade
O jogo foi balanceado ao redor da dificuldade padrão, mas caso esteja muito difícil, você pode ajustar algumas das constantes no arquivo `src/utils`, facilitando o jogo.
