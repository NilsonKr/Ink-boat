## Folder Structure

- Only for pages or components

* component should go inside (ComponentName).tsx and exported default in index.tsx

## Component Structure

When creating or modifying a component, take in account to follow this file order

```
## React or third-party imports

## Redux, context or hooks imports

## Styled components from (componentName).style.tsx imports

## Components imports

## utils, constants imports

## types imports


type ComponentProps: React.FC<> = {
  ...
}

const ComponentName: ComponentProps = () => {
  ## Theme or context selectors

  ## use states

  ## constants

  ## use effects

  ## function and other logic

  return (
    <>...</>
  )

}

export default ComponentName
```
