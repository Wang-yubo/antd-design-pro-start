import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const defaultMessage = '烽烟科技技术部出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'name',
          title: 'APP名称',
          href: '',
        },
      ]}
    />
  );
};
