<template>
  <div class="table stop" @click="tableClick()" ref="table">
    <div class="frame">
      <div class="corner tl" style="--order: 1">
        <div>free <span>🅿️</span> parking</div>
      </div>
      <div class="corner tr" style="--order: 11">
        <div>go to <span>👮</span> jail</div>
      </div>
      <div class="corner bl" style="--order: 31">
        <div>in <span>🗝</span> jail</div>
      </div>
      <div class="corner br" style="--order: 41">
        <div>
          <em>collect \n 200€ salary as you pass</em>
          go <span>↖️</span>
        </div>
      </div>
      <div class="center" style="--order: 13">
        <div class="logo">monopoly</div>
        <div class="cards community">community chest</div>
        <div class="cards chance">chance</div>
      </div>
      <div
        v-for="cell in cells"
        :key="cell.order"
        :class="cell.pos + ' ' + cell.color"
        :style="'--order: ' + cell.order + ';'"
      >
        <div class="inside">
          <!-- <div class="fixed self-center items-center ml-5 mt-5">
            <img
              src="https://cdn.pixabay.com/photo/2013/07/13/11/36/game-158470_1280.png"
              class="w-5"
            />
          </div> -->
          <h2>{{ cell.label }}</h2>
          <span>{{ cell.icon }}</span>
          <strong>{{ cell.price }}</strong>
        </div>
      </div>
    </div>
  </div>
  <nav
    class="
      rounded-xl
      fixed
      bottom-0
      inset-x-0
      bg-blue-100
      flex
      justify-between
      text-sm text-green-700
      uppercase
      font-mono
    "
  >
    <button
      class="
        w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl
      "
    >
      Acheter des maisons</button
    ><button
      href="#"
      class="
        w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl
      "
    >
      Faire un échange</button
    ><button
      href="#"
      class="
        w-full
        block
        py-3
        px-3
        text-center
        hover:bg-green-200 hover:text-green-800
        transition
        duration-300
        rounded-xl
      "
    >
      Lancer les dés
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Board',
  data() {
    return {
      cells: [
        {
          label: 'strand',
          price: '220€',
          icon: '',
          color: 'red',
          order: '2',
          pos: 'top'
        },
        {
          label: 'chance',
          price: '',
          icon: '❓',
          color: 'none',
          order: '3',
          pos: 'top'
        },
        {
          label: 'fleet street',
          price: '220€',
          icon: '',
          color: 'red',
          order: '4',
          pos: 'top'
        },
        {
          label: 'trafalgar square',
          price: '240€',
          icon: '',
          color: 'none',
          order: '5',
          pos: 'top'
        },
        {
          label: 'fenchurch st. station',
          price: '200€',
          icon: '🚂',
          color: 'none',
          order: '6',
          pos: 'top'
        },
        {
          label: 'leicester square',
          price: '260€',
          icon: '',
          color: 'yellow',
          order: '7',
          pos: 'top'
        },
        {
          label: 'ceventry street',
          price: '200€',
          icon: '',
          color: 'yellow',
          order: '8',
          pos: 'top'
        },
        {
          label: 'water\nworks',
          price: '150€',
          icon: '🚰',
          color: 'none',
          order: '9',
          pos: 'top'
        },
        {
          label: 'piccadilly',
          price: '280€',
          icon: '',
          color: 'yellow',
          order: '10',
          pos: 'top'
        },
        {
          label: 'vine street',
          price: '200€',
          icon: '',
          color: 'orange',
          order: '12',
          pos: 'left'
        },
        {
          label: "marlborog'h street",
          price: '200€',
          icon: '',
          color: 'orange',
          order: '15',
          pos: 'left'
        },
        {
          label: 'community chest',
          price: '',
          icon: '💰',
          color: 'none',
          order: '17',
          pos: 'left'
        },
        {
          label: 'bow street',
          price: '180€',
          icon: '',
          color: 'orange',
          order: '19',
          pos: 'left'
        },
        {
          label: 'marylebone station',
          price: '200€',
          icon: '🚂',
          color: 'none',
          order: '21',
          pos: 'left'
        },
        {
          label: "northumrl'd avenue",
          price: '160€',
          icon: '',
          color: 'pink',
          order: '23',
          pos: 'left'
        },
        {
          label: 'whitehall',
          price: '140€',
          icon: '',
          color: 'pink',
          order: '25',
          pos: 'left'
        },
        {
          label: 'electric company',
          price: '150€',
          icon: '💡',
          color: 'none',
          order: ' 27',
          pos: 'left'
        },
        {
          label: 'pall mall',
          price: '140€',
          icon: '',
          color: 'pink',
          order: '29',
          pos: 'left'
        },
        {
          label: 'regent street',
          price: '300€',
          icon: '',
          color: 'green',
          order: '14',
          pos: 'right'
        },
        {
          label: 'oxford street',
          price: '300€',
          icon: '',
          color: 'green',
          order: '16',
          pos: 'right'
        },
        {
          label: 'community chest',
          price: '',
          icon: '💰',
          color: 'none',
          order: '18',
          pos: 'right'
        },
        {
          label: 'bond street',
          price: '320€',
          icon: '',
          color: 'green',
          order: '20',
          pos: 'right'
        },
        {
          label: 'liverpool st. station',
          price: '320€',
          icon: '🚂',
          color: 'none',
          order: '22',
          pos: 'right'
        },
        {
          label: 'chance',
          price: '',
          icon: '',
          color: 'none',
          order: '24',
          pos: 'right'
        },
        {
          label: 'park lane',
          price: '350€',
          icon: '',
          color: 'blue',
          order: '26',
          pos: 'right'
        },
        {
          label: 'super\ntax',
          price: '100€',
          icon: '💍',
          color: 'none',
          order: '28',
          pos: 'right'
        },
        {
          label: 'mayfair',
          price: '400€',
          icon: '',
          color: 'blue',
          order: '30',
          pos: 'right'
        },
        {
          label: 'pentonville road',
          price: '120€',
          icon: '',
          color: 'sky',
          order: '32',
          pos: 'bottom'
        },
        {
          label: 'euston road',
          price: '100€',
          icon: '',
          color: 'sky',
          order: '33',
          pos: 'bottom'
        },
        {
          label: 'chance',
          price: '',
          icon: '❓',
          color: 'none',
          order: '34',
          pos: 'bottom'
        },
        {
          label: 'the angel, islington',
          price: '100€',
          icon: '',
          color: 'sky',
          order: '35',
          pos: 'bottom'
        },
        {
          label: 'kings cross station',
          price: '200€',
          icon: '🚂',
          color: 'none',
          order: '36',
          pos: 'bottom'
        },
        {
          label: 'income\ntax',
          price: '200€',
          icon: '🔸',
          color: 'none',
          order: '37',
          pos: 'bottom'
        },
        {
          label: 'whitechapel road',
          price: '60€',
          icon: '',
          color: 'brown',
          order: '38',
          pos: 'bottom'
        },
        {
          label: 'community chest',
          price: '',
          icon: '💰',
          color: 'none',
          order: '39',
          pos: 'bottom'
        },
        {
          label: 'old kent road',
          price: '60€',
          icon: '',
          color: 'brown',
          order: '40',
          pos: 'bottom'
        }
      ]
    };
  },
  methods: {
    tableClick() {
      const table = this.$refs.table;
      if (table.classList.contains('stop')) {
        table.classList.remove('stop');
        table.classList.add('start');
        setTimeout(function () {
          table.classList.add('rotation');
        }, 2000);
      } else {
        table.classList.add('hide');
        table.classList.add('stop');
        setTimeout(function () {
          table.classList.remove('hide');
          table.classList.remove('start');
          table.classList.remove('rotation');
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
main .table {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 868px;
  height: 868px;
  border-radius: 14px;
  transition: 2s;
  cursor: pointer;
}
main .table.hide {
  opacity: 0;
}

main .table.start {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%) scale(0.6) rotateX(60deg) rotateZ(55deg);
  width: 868px;
  height: 868px;
  box-shadow: 4px 2px 10px 0px rgba(46, 70, 77, 0.2);
}
main .table.rotation {
  animation-duration: 20s;
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotate {
  from {
    transform: translate(-50%, -60%) scale(0.6) rotateX(60deg) rotateZ(55deg);
    box-shadow: 4px 2px 10px 0px rgba(46, 70, 77, 0.2);
  }
  to {
    transform: translate(-50%, -60%) scale(0.6) rotateX(60deg) rotateZ(415deg);
    box-shadow: -4px 2px 10px 0px rgba(46, 70, 77, 0.2);
  }
}
.frame {
  display: grid;
  grid: 100px repeat(9, 68px) 100px/100px repeat(9, 68px) 100px;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 8px;
  grid-gap: 4px;
  border-radius: 14px;
  background: #2e464d;
}
.frame > div {
  display: block;
  position: relative;
  grid-column: span 1;
  order: var(--order);
  background: #b2e0c8;
}
.frame > div .inside {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 68px;
  height: 100px;
  padding: 4px;
  text-align: center;
}
.frame > div .inside h2,
.frame > div .inside strong {
  width: 58px;
  margin: 6px auto 12px auto;
  text-align: center;
  font-size: 8.5px;
  line-height: 10px;
  text-transform: uppercase;
  font-weight: bold;
}
.frame > div .inside strong {
  position: absolute;
  left: 0px;
  bottom: 8px;
  width: 100%;
  margin: 0px;
}
.frame > div .inside span {
  display: block;
  width: 100%;
  font-size: 34px;
  line-height: 38px;
}
.frame > div .inside:before {
  content: '';
  display: block;
  width: 100%;
  height: 20px;
  border-radius: 2px 2px 1px 1px;
}
.frame > div.brown .inside:before {
  background: #894c4b;
}
.frame > div.sky .inside:before {
  background: #46bfff;
}
.frame > div.pink .inside:before {
  background: #f89aa9;
}
.frame > div.orange .inside:before {
  background: #eda13d;
}
.frame > div.red .inside:before {
  background: #d05858;
}
.frame > div.green .inside:before {
  background: #079a97;
}
.frame > div.yellow .inside:before {
  background: #e9c33d;
}
.frame > div.blue .inside:before {
  background: #4b5c99;
}
.frame > div.none .inside:before {
  display: none;
}
.frame > div.center {
  grid-row: span 9;
  grid-column: span 9;
}
.frame > div.top {
  border-radius: 1px 1px 4px 4px;
}
.frame > div.top .inside {
  transform: rotate(180deg);
  transform-origin: 34px 50px;
}
.frame > div.left {
  border-radius: 1px 4px 4px 1px;
}
.frame > div.left .inside {
  transform: rotate(90deg);
  transform-origin: 50px 50px;
}
.frame > div.right {
  border-radius: 4px 1px 1px 4px;
}
.frame > div.right .inside {
  transform: rotate(-90deg);
  transform-origin: 34px 34px;
}
.frame > div.bottom {
  border-radius: 4px 4px 1px 1px;
}
.frame > div.center {
  position: relative;
  border-radius: 4px;
  background: #95cfad;
}
.frame > div.center .logo {
  display: block;
  position: absolute;
  top: calc(50% - 60px);
  left: calc(50% - 250px);
  width: 500px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  font-size: 86px;
  text-transform: uppercase;
  color: #fff;
  animation: spin-45 1ms;
  animation-play-state: paused;
  transform-origin: 50% 50%;
  border: 4px solid #d05858;
  border-radius: 10px;
  background: #d05858;
}
.frame > div.center .logo:before {
  content: '';
  display: block;
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  border: 3px solid #fff;
  border-radius: 7px;
}
.frame > div.center .logo:after {
  content: '🎩';
  display: block;
  position: absolute;
  top: -40px;
  left: calc(50% - 40px);
  width: 80px;
  height: 80px;
  transform-origin: 50% 50%;
  font-size: 40px;
  line-height: 80px;
}
.frame > div.center .cards {
  display: block;
  position: absolute;
  width: 200px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  text-transform: uppercase;
  color: rgba(46, 70, 77, 0.5);
  border: 4px dotted rgba(46, 70, 77, 0.5);
}
.frame > div.center .cards.community {
  top: 125px;
  left: 266px;
  transform: rotate(135deg);
  transform-origin: 0px 0px;
}
.frame > div.center .cards.chance {
  bottom: 182px;
  right: 40px;
  transform: rotate(-45deg);
  transform-origin: 100% 100%;
}
.frame > div.corner div {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  text-align: center;
  text-transform: uppercase;
}
.frame > div.corner div span {
  display: block;
  font-size: 30px;
}
.frame > div.corner.tl {
  border-radius: 8px 1px 4px 1px;
}
.frame > div.corner.tl div {
  top: -5px;
  right: 5px;
  animation: spin135 1ms;
  animation-play-state: paused;
}
.frame > div.corner.tr {
  border-radius: 1px 8px 1px 4px;
}
.frame > div.corner.tr div {
  top: -5px;
  left: 5px;
  animation: spin-135 1ms;
  animation-play-state: paused;
}
.frame > div.corner.bl {
  border-radius: 1px 4px 1px 8px;
}
.frame > div.corner.bl div {
  top: 5px;
  right: 5px;
  animation: spin45 1ms;
  animation-play-state: paused;
}
.frame > div.corner.br {
  border-radius: 4px 1px 8px 1px;
}
.frame > div.corner.br div {
  top: 5px;
  left: 5px;
  font-size: 30px;
  animation: spin-45 1ms;
  animation-play-state: paused;
}
.frame > div.corner.br div em {
  display: block;
  font-size: 7px;
  width: 70%;
  margin: 0px auto;
  font-style: normal;
}

@keyframes spin45 {
  0% {
    transform: rotate(45deg);
  }
}
@keyframes spin-45 {
  0% {
    transform: rotate(-45deg);
  }
}
@keyframes spin135 {
  0% {
    transform: rotate(135deg);
  }
}
@keyframes spin-135 {
  0% {
    transform: rotate(-135deg);
  }
}
</style>
