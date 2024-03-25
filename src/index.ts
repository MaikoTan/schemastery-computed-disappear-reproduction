import { Computed, Context, Schema } from 'koishi'

export const name = 'repro'

export interface Config {
  testNormal: 'one' | 'two'
  testComputed: Computed<'one' | 'two'>
  testComputedUnionConst: Computed<'one' | 'two'>
  testComputedRadio: Computed<'one' | 'two'>
  testComputedUnionConstRadio: Computed<'one' | 'two'>
}

export const Config: Schema<Config> = Schema.object({
  testNormal: Schema.union(['one', 'two']).default('one'),
  testComputed: Schema.computed(Schema.union(['one', 'two'])).default('one'),
  testComputedUnionConst: Schema.computed(Schema.union([Schema.const('one'), Schema.const('two')])).default('one'),
  testComputedRadio: Schema.computed(Schema.union(['one', 'two']))
    .role('radio')
    .default('one'),
  testComputedUnionConstRadio: Schema.computed(Schema.union([Schema.const('one'), Schema.const('two')]))
    .role('radio')
    .default('one'),
})

export function apply(ctx: Context) {
  const logger = ctx.logger('repro')
  ctx.on('ready', () => {
    logger.info('plugin loaded')
  })
}
