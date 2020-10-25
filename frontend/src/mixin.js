export default {
  methods: {
    /**
     * Validate a variable if its a valid number, used for User-Inputs. Does not handle overflows.
     * @param {*} num Number / User-Input which should be validated
     * @param {number} [min] Inclusive minimum of numbers spectrum
     * @param {number} [max] Inclusive maximum of numbers spectrum
     * @param {'int'|'float'} [t] To be parsed type
     */
    $validateNumber(num, min, max, t) {
      t = t || 'int'
      const parsed = t === 'int' ? parseInt(num) : t === 'float' ? parseFloat(num) : false
      if (!parsed) return false

      if (Number.isNaN(parsed)) return false
      const isLargerThanMin = typeof min === undefined ? true : parsed >= min
      const isSmallerThanMax = typeof max === undefined ? true : parsed <= max
      return isLargerThanMin && isSmallerThanMax
    }
  }
}
