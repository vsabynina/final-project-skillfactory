declare module "*.module.css";

declare module "*.jpg" {
  export default "" as string;
}
declare module "*.jpeg" {
  export default "" as string;
}

declare module "*.png" {
  export default "" as string;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
