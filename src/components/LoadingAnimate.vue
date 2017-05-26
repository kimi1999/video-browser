<template>
  <div class="flex1" style="text-align:center">
    <!-- 震动音符 SVG -->
    <template v-if="animateType=='bars'">
      <svg viewBox="0 0 135 138" class="bars"  :style="{width:animateWidth}">
        <rect y="5.76927" width="15" height="128.461" rx="6" :style="{fill:animateColor}">
          <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120"
                   calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </rect>
        <rect x="30" y="20.3846" width="15" height="99.2307" rx="6" :style="{fill:animateColor}">
          <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120"
                   calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </rect>
        <rect x="60" width="15" height="74.2307" rx="6" y="32.8846" :style="{fill:animateColor}">
          <animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120"
                   calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </rect>
        <rect x="90" y="20.3846" width="15" height="99.2307" rx="6" :style="{fill:animateColor}">
          <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120"
                   calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </rect>
        <rect x="120" y="5.76927" width="15" height="128.461" rx="6" :style="{fill:animateColor}">
          <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120"
                   calcMode="linear" repeatCount="indefinite"></animate>
          <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </rect>
      </svg>
    </template>

    <!-- audio SVG -->
    <template v-else-if="animateType=='audio'">
      <svg viewBox="0 0 55 80" class="audio"  :style="{width:animateWidth}">
        <g transform="matrix(1 0 0 -1 0 80)">
          <rect width="10" height="63.5344" rx="3" :style="{fill:animateColor}">
            <animate attributeName="height" begin="0s" dur="4.3s"
                     values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"
                     repeatCount="indefinite"></animate>
          </rect>
          <rect x="15" width="10" height="37.9846" rx="3" :style="{fill:animateColor}">
            <animate attributeName="height" begin="0s" dur="2s" values="80;55;33;5;75;23;73;33;12;14;60;80"
                     calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
          <rect x="30" width="10" height="76.991" rx="3" :style="{fill:animateColor}">
            <animate attributeName="height" begin="0s" dur="1.4s" values="50;34;78;23;56;23;34;76;80;54;21;50"
                     calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
          <rect x="45" width="10" height="20.2503" rx="3" :style="{fill:animateColor}">
            <animate attributeName="height" begin="0s" dur="2s" values="30;45;13;80;56;72;45;76;34;23;67;30"
                     calcMode="linear" repeatCount="indefinite"></animate>
          </rect>
        </g>
      </svg>
    </template>

    <!-- 波纹效果 SVG 慢速 -->
    <template v-else-if="animateType=='ring'">
      <svg viewBox="0 0 45 45" class="ring"  :style="{width:animateWidth}">
        <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
          <circle cx="22" cy="22" r="6.92623" stroke-opacity="0" :style="{stroke: animateColor}">
            <animate attributeName="r" begin="1.5s" dur="3s" values="6;22" calcMode="linear"
                     repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="1.5s" dur="3s" values="1;0" calcMode="linear"
                     repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="1.5s" dur="3s" values="2;0" calcMode="linear"
                     repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="14.9262" stroke-opacity="0" :style="{stroke: animateColor}">
            <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear"
                     repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="3s" dur="3s" values="1;0" calcMode="linear"
                     repeatCount="indefinite"></animate>
            <animate attributeName="stroke-width" begin="3s" dur="3s" values="2;0" calcMode="linear"
                     repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="2.52663" :style="{stroke: animateColor}">
            <animate attributeName="r" begin="0s" dur="1.5s" values="6;1;2;3;4;5;6" calcMode="linear"
                     repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </template>

    <!-- 波纹效果 SVG 快速 -->
    <template v-else-if="animateType=='puff'">
      <svg viewBox="0 0 44 44" class="puff"  :style="{width:animateWidth}">
        <g fill="none" fill-rule="evenodd" stroke-width="2">
          <circle cx="22" cy="22" r="19.2243"  :style="{stroke: animateColor}">
            <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1"
                     keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1"
                     keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
          </circle>
          <circle cx="22" cy="22" r="9.46156" :style="{stroke: animateColor}">
            <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1"
                     keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline"
                     keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"></animate>
          </circle>
        </g>
      </svg>
    </template>

    <!-- 渐变点点 SVG 快速 -->
    <template v-else-if="animateType=='dots'">
      <svg viewBox="0 0 120 30" class="dots"  :style="{width:animateWidth}">
        <circle cx="15" cy="15" r="13.1437" :style="{fill:animateColor,stroke: animateColor}">
          <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear"
                   repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </circle>
        <circle cx="60" cy="15" r="10.8563" fill-opacity="0.3" :style="{fill:animateColor,stroke: animateColor}">
          <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear"
                   repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5"
                   calcMode="linear" repeatCount="indefinite"></animate>
        </circle>
        <circle cx="105" cy="15" r="13.1437" :style="{fill:animateColor,stroke: animateColor}">
          <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear"
                   repeatCount="indefinite"></animate>
          <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear"
                   repeatCount="indefinite"></animate>
        </circle>
      </svg>
    </template>

    <!-- 转圈 SVG -->
    <template v-else="animateType=='circular'">
      <svg viewBox="25 25 50 50" class="circular" :style="{width:animateWidth}">
        <circle cx="50" cy="50" r="20" fill="none" class="path" :style="{stroke: animateColor}"></circle>
      </svg>
    </template>
  </div>
</template>

<style lang="less" scoped>
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35
    }

    to {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124
    }
  }

  svg:not(:root) {
    overflow: hidden;
  }

  .circular {
    width: 42px;
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;

  }

  .circular .path {
    -webkit-animation: dash 1.5s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite;
    stroke-dasharray: 1, 100;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #20a0ff;
    stroke-linecap: round;
  }

  circle {
    stroke: #20a0ff;
  }

  .ring {
    width: 45px;
  }

  .audio {
    width: 42px;
    height: 45px;
  }

  .bars {
    width: 42px;
  }

  .dots {
    width: 60px;
    margin-top: 10px;
  }

   .audio rect,  .bars rect,  .dots circle {
    fill: #20a0ff;
  }
</style>

<script lang="babel">
  export default{
    props:["animate-type","animate-color","animate-width"]
  }
</script>
