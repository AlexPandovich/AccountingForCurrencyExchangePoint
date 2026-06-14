import BigNumber from "bignumber.js"

export default class MonthSum {
	buyDt2412: BigNumber = new BigNumber(0)
	buyDt534 : BigNumber = new BigNumber(0)
	buydt2411total: BigNumber = new BigNumber(0)

	buyCt2412 : BigNumber = new BigNumber(0)
	buyCt2421: BigNumber = new BigNumber(0)
	buyCt531 : BigNumber = new BigNumber(0)
	buyCtTotal: BigNumber = new BigNumber(0)
	buyCtSum: BigNumber = new BigNumber(0)

	sellDtCt2411: BigNumber = new BigNumber(0)
	sellDt611: BigNumber = new BigNumber(0)
	sellDt622: BigNumber = new BigNumber(0)
	sellDtTotal: BigNumber = new BigNumber(0)

	sellCtDt2411: BigNumber = new BigNumber(0)
	sellCt711: BigNumber = new BigNumber(0)
	sellCt722: BigNumber = new BigNumber(0)
	sellCtTotal: BigNumber = new BigNumber(0)
	sellDtSum: BigNumber = new BigNumber(0)
}