import "./PageHeader.css";

type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h2 className="page-header__title">{title}</h2>

      {description && <p className="page-header__description">{description}</p>}
    </header>
  );
}
