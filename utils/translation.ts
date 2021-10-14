/**
 * @Author wyb
 * @Date 2021-09-29 10:27:12
 * @Desc 翻译字典 格式化数字成货币
 */

export interface orderStatusOptionsItem {
  code?: string | number;
  text?: string;
  desc?: string;
}

/**
 * @desc ToText
 * @param options
 * @param code
 */
export function translatToText<T extends orderStatusOptionsItem>(options: T[], code: number) {
  const obj = options.find((item) => item?.code?.toString() === code.toString());
  return obj?.text;
}

/**
 * @desc ToCode
 * @param options
 * @param text
 */
export const translatToCode = (options: any[], text: string) => {
  const obj = options.find((item) => item.code === text);
  return obj.code;
};

/**
 * @decs ToDesc
 * @param options
 * @param code
 */
export function translatToDesc<T extends orderStatusOptionsItem>(
  options: T[],
  code: number | undefined,
) {
  const obj = options.find((item) => item.code === code?.toString());
  return obj?.desc;
}

/**
 * @desc 数字格式化成货币
 * @param num
 */
export const toCurrencyCNY = (num: number) => {
  return num.toLocaleString('zh-CN', {
    /** 类型：货币 */
    style: 'currency',
    /** 货币单位：人民币 */
    currency: 'CNY',
  });
};
