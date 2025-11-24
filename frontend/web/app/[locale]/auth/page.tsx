import { useTranslations } from "next-intl";

const AuthLoginPage = () => {
  const t = useTranslations('Auth');
  return (
    <div className="flex justify-center align-middle items-center">
      <h1 className="text-center font-bold">{t('title')}</h1>
    </div>
  );
};

export default AuthLoginPage;
