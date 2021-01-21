export default function routes(keyGen) {
  return {
    urlAppbalance: {
      key: keyGen(),
      defaultMessage: '/app/balance'
    },
    urlAppwithdrawal: {
      key: keyGen(),
      defaultMessage: '/app/withdrawal'
    },
    urlAppaffiliate: {
      key: keyGen(),
      defaultMessage: '/app/affiliate'
    },
    urlAppmarketing: {
      key: keyGen(),
      defaultMessage: '/app/marketing'
    },
    urlAppoperation: {
      key: keyGen(),
      defaultMessage: '/app/operation'
    },
    urlAppsupport: {
      key: keyGen(),
      defaultMessage: '/app/support'
    },
    urlApplegal: {
      key: keyGen(),
      defaultMessage: '/app/legal'
    }
  }
}
