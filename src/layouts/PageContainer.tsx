import { Grid, GridItem } from "@chakra-ui/react";

export function PageContainer({
  header,
  children,
  footer,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Grid
      templateAreas={`"header"
                      "data"
                      "footer"`}
      gridTemplateRows={"3rem 1fr 3rem"}
      minH={"100%"}
      gap="4"
      flexGrow={1}
    >
      <GridItem area="header">{header}</GridItem>
      <GridItem area="data" bg="white">
        {children}
      </GridItem>
      <GridItem area="footer">{footer}</GridItem>
    </Grid>
  );
}
