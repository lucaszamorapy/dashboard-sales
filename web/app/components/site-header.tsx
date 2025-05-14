import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

interface SiteHeaderProps {
  path: string;
}

export function SiteHeader({ path }: SiteHeaderProps) {
  const setTitle = () => {
    let title;
    switch (path) {
      case "/":
        title = "Início";
        break;
      case "/clients":
        title = "Clientes";
        break;
      case "/products":
        title = "Produtos";
        break;
      case "/orders":
        title = "Pedidos";
        break;
    }
    console.log("title", title);
    return title;
  };
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-black font-medium">{setTitle()}</h1>
      </div>
    </header>
  );
}
