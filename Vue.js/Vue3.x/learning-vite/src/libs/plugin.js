
import { Toast } from 'vant';

export default {
  install: (app, options) => {
    app.mixin({
      data() {
        return {
          lodingId: null
        }
      },
      methods: {
        $loading() {
          this.lodingId = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
            loadingType: 'spinner',
          })
        },
        enumMessage(value, enums) {
          if (!enums || !enums.length) {
            return value;
          }
          for (const $enum of enums) {
            if ($enum.value === value) {
              return $enum.displayName;
            }
          }

          return value;
        },
        amountFormat(value, currency = '元', decimals = 2) {
          const digitsRE = /(\d{3})(?=\d)/g;
          value = parseFloat(value);
          if (!value && value !== 0) return '';
          const stringified = Math.abs(value).toFixed(decimals);
          const $int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
          const i = $int.length % 3;
          const head = i > 0 ? ($int.slice(0, i) + ($int.length > 3 ? ',' : '')) : '';
          const $float = decimals ? stringified.slice(-1 - decimals) : '';
          const sign = value < 0 ? '-' : '';
          return `${sign}${head}${$int.slice(i).replace(digitsRE, '$1,')}${$float} ${currency}`;

        },
        onNavClickLeft() {
          this.$router.back()
        }
      }
    })
  }
}

