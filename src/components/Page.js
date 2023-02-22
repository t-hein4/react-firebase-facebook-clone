import Layout from "./Layout";
import HideAppBar from "./HideAppBar";
import LayoutMiddle from "./LayoutMiddle";

function Page({ title, titleColor, component }) {
  return (
    <Layout
      top={<HideAppBar title={title} titleColor={titleColor} />}
      // left={<Skeleton variant="rectangular" height="100%" />}
      left={<div />}
      middle={<LayoutMiddle component={component} />}
      // right={<Skeleton variant="rectangular" height="100%" />}
      right={<div />}
    />
  );
}

export default Page;
