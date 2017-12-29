const test = require('tape')
const zaddr = require('../index')

// Generated using zcashd v1.0.14-RC1.
const mainnetPairs = [
  {
    network: 'mainnet',
    spendingKey: 'SKxss2BvgfLjKCmrWNdGdG3B9ZHhQf2L1kGsQB34uykWeYRHgaDN',
    viewingKey: 'ZiVKcXfY5nvfyuijKM3UyqnXx5ymCnp7ndgcTg1je5fJutsYxKiUousgH4TP2vY2pMBK594X91vdiFH8gR41gTjutR1ycsuzW',
    address: 'zcNStB2sLnxPUTsg6aCSSQFdutcrp1a816m848ngoYLUa6kRTC3uZMWAhHnCU6bPtYyYGSw4HFFgDS2u6pwv41cx8BBgy8u'
  },
  {
    network: 'mainnet',
    spendingKey: 'SKxtYkM8R8X8eAvKJLyckV5Gero9SaHMDDSq3Z54opLi3NjPJZCq',
    viewingKey: 'ZiVKsSgutqkoyzZi1MvWvBwNYFdKsUGBdQ3pCNFS1SebacucPqmaJvMYLgBU3c3ybMa1FFeVsCmZnQB743vF2wk93AHQrWVcB',
    address: 'zcdMuYqvAvxUKSZgyc8nbEqoZTHYG5QtNJVpHqA3nq1CcAiWo2QNTMBQoAXcD64AAhF39KdLkNP61xw9Afw2GFq5nHpQE7n'
  },
  {
    network: 'mainnet',
    spendingKey: 'SKxsPUTCPExBhPo9aBXXDpnwq2B53dD6rMAZuHRSpGA89mvvDoZ5',
    viewingKey: 'ZiVKYjyTf7Zu7mQs2gnvXy8NRm9orGZTdtNGV2usUuxRNzcP6AwcQRXppYbEW8sGUxv6DQ9CXjMKubk7nA7EmZdgkaSuTCvas',
    address: 'zcJfC6cBz26FAbb1r1kZnEjK5wGLZMRNgknUxGdX6eoaJuu8JNFDi4avFQG5a8vMCgJyr6V8wP5kumvrwcqwxPJytTSAo36'
  }
]

test('generateSpendingKey', function (t) {
  const mainnetSpendingKey = zaddr.generateSpendingKey('mainnet')
  t.equal(mainnetSpendingKey.slice(0, 2), 'SK')

  const testnetSpendingKey = zaddr.generateSpendingKey('testnet')
  t.equal(testnetSpendingKey.slice(0, 2), 'ST')
  t.end()
})

test('generateViewingKeyFromSpendingKey', function (t) {
  const mainnetSpendingKey = zaddr.generateSpendingKey('mainnet')
  const mainnetViewingKey = zaddr.generateViewingKeyFromSpendingKey(mainnetSpendingKey, 'mainnet')
  t.equal(mainnetViewingKey.slice(0, 4), 'ZiVK')

  const testnetSpendingKey = zaddr.generateSpendingKey('testnet')
  const testnetViewingKey = zaddr.generateViewingKeyFromSpendingKey(testnetSpendingKey, 'testnet')
  t.equal(testnetViewingKey.slice(0, 4), 'ZiVt')
  t.end()
})

test('generateAddressFromSpendingKey', function (t) {
  const mainnetSpendingKey = zaddr.generateSpendingKey('mainnet')
  const mainnetAddress = zaddr.generateAddressFromSpendingKey(mainnetSpendingKey, 'mainnet')
  t.equal(mainnetAddress.slice(0, 2), 'zc')

  const testnetSpendingKey = zaddr.generateSpendingKey('testnet')
  const testnetAddress = zaddr.generateAddressFromSpendingKey(testnetSpendingKey, 'testnet')
  t.equal(testnetAddress.slice(0, 2), 'zt')
  t.end()
})

test('generateWallet', function (t) {
  const mainnetWallet = zaddr.generateWallet('mainnet')
  t.equal(mainnetWallet.spendingKey.slice(0, 2), 'SK')
  t.equal(mainnetWallet.address.slice(0, 2), 'zc')

  const testnetWallet = zaddr.generateWallet('testnet')
  t.equal(testnetWallet.spendingKey.slice(0, 2), 'ST')
  t.equal(testnetWallet.address.slice(0, 2), 'zt')
  t.end()
})

mainnetPairs.forEach(function (pair, index) {
  test('generateViewingKeyFromSpendingKey' + index, function (t) {
    const viewingKey = zaddr.generateViewingKeyFromSpendingKey(pair.spendingKey, pair.network)
    t.equal(viewingKey, pair.viewingKey)
    t.end()
  })

  test('generateAddressFromSpendingKey' + index, function (t) {
    const address = zaddr.generateAddressFromSpendingKey(pair.spendingKey, pair.network)
    t.equal(address.slice(0, 2), 'zc')
    t.equal(address, pair.address)
    t.end()
  })
})
