# Panel example

Full image with text at top

```js
<Panel backgroundImage="https://placekitten.com/400/300">
  {({ Header, Image, Body }) => (
    <div>
      <Header top>
        Smartphone app helps communities improve their fisheries management
      </Header>
    </div>
  )}
</Panel>
```

```js
<Panel backgroundImage="https://placekitten.com/400/300">
  {({ Header, Image, Body }) => (
    <div>
      <Body>
        <Header>Apparel for Mom</Header>
        <p>Make Mom smile with a gift that protects wildlife and nature.</p>
      </Body>
    </div>
  )}
</Panel>
```
