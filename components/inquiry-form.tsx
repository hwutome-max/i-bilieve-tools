"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitInquiry, type InquiryState } from "@/app/actions/inquiry";

const initialState: InquiryState = { status: "idle" };

type Props = {
  productId?: string;
  productTitle?: string;
  material?: string;
  diameter?: string;
};

export function InquiryForm({ productId, productTitle, material, diameter }: Props) {
  const t = useTranslations("inquiry");
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  const kept = state.values;

  return (
    <form className="inquiry-form" action={action} key={`${state.status}:${kept?.email ?? ""}:${kept?.message ?? ""}`}>
      {productId ? <input type="hidden" name="productId" value={productId} /> : null}
      {productTitle ? <p>{t("about")}: {productTitle}</p> : null}
      <label>
        {t("email")}
        <input name="email" type="email" autoComplete="email" required maxLength={200} defaultValue={kept?.email ?? ""} />
      </label>
      <label>
        {t("name")}
        <input name="name" autoComplete="name" maxLength={200} defaultValue={kept?.name ?? ""} />
      </label>
      <label>
        {t("country")}
        <input name="country" autoComplete="country-name" maxLength={120} defaultValue={kept?.country ?? ""} />
      </label>
      <label>
        {t("material")}
        <input name="material" defaultValue={kept?.material ?? material ?? ""} maxLength={160} />
      </label>
      <label>
        {t("diameter")}
        <input name="diameter" defaultValue={kept?.diameter ?? diameter ?? ""} maxLength={40} />
      </label>
      <label>
        {t("quantity")}
        <input name="quantity" maxLength={40} defaultValue={kept?.quantity ?? ""} />
      </label>
      <label>
        {t("message")}
        <textarea name="message" required minLength={2} maxLength={4000} defaultValue={kept?.message ?? ""} />
      </label>
      <button className="button button--solid" type="submit" disabled={pending}>
        {pending ? t("pending") : t("submit")}
      </button>
      {state.status !== "idle" ? (
        <p className={state.status === "success" ? "form-status" : "form-status form-status--bad"} role="status">
          {t(state.status)}
        </p>
      ) : null}
    </form>
  );
}
