import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="site-footer">
      <div>
        <p>{t("company")}</p>
        <p>{t("address")}</p>
      </div>
      <div>
        <p><a href="mailto:jessica@ibelievetools.com">jessica@ibelievetools.com</a></p>
        <p><a href="tel:+8615862924461">+86 158 6292 4461</a></p>
        <p><a href="tel:+8618952977678">+86 189 5297 7678</a></p>
      </div>
      <p>{t("rights")}</p>
    </footer>
  );
}
