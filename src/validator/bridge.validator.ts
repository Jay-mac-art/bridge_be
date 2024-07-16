import Joi from 'joi';

export const getTokensQuerySchema = Joi.object({
  chainId: Joi.number().integer().positive().required()
});

export const postQuotesBodySchema = Joi.object({
  srcChainId: Joi.number().integer().positive().required(),
  srcQuoteTokenAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
  srcQuoteTokenAmount: Joi.string().pattern(/^\d+$/).required(),
  dstChainId: Joi.number().integer().positive().required(),
  dstQuoteTokenAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
  slippage: Joi.number().min(0).max(100).required(),
  affiliate: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).optional(),
  commissionRate: Joi.number().integer().min(0).max(1000000).optional(),
  bridgeProviders: Joi.string().optional(),
  srcSwapProviders: Joi.string().optional(),
  dstSwapProviders: Joi.string().optional()
});

export const postParamsBodySchema = Joi.object({
  srcChainId: Joi.number().integer().positive().required(),
  srcQuoteTokenAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
  srcQuoteTokenAmount: Joi.string().pattern(/^\d+$/).required(),
  dstChainId: Joi.number().integer().positive().required(),
  dstQuoteTokenAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
  slippage: Joi.number().min(0).max(100).required(),
  receiver: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).required(),
  affiliate: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).optional(),
  commissionRate: Joi.number().integer().min(0).max(1000000).optional(),
  bridgeProvider: Joi.string().optional(),
  srcBridgeTokenAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).optional(),
  dstBridgeTokenAddress: Joi.string().pattern(/^0x[a-fA-F0-9]{40}$/).optional(),
  srcSwapProvider: Joi.string().optional(),
  dstSwapProvider: Joi.string().optional()
});