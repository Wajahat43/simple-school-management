/* Let's say we have a LinkButtom component from which we want to return either a tag or button tag
 based on if href attribute is provided.
 */

function LinkButton({ href, children, ...delegated }) {
  if (href) {
    return (
      <a href className={styles.button} {...delegated}>
        {children}
      </a>
    );
  }

  return (
    <button href={href} className={styles.button} {...delegated}>
      {children}
    </button>
  );
}

//The above code works, but if we were to change props, we will have to do it in two places. Let's try to fix this using polymorphism

function LinkButton({ href, children, ...delegated }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag className={styles.button} {...delegated}>
      {children}
    </Tag>
  );
}

/**
 Now if href is provided, a tag will be returned, else button tag will be returned.
 */

/**
  Also our 'Tag' variable name cannot be 'tag', that is because react uses first letter capital rule to check if we are providing
  it a component or a html element. If the first letter is not capital then it will be treated as html element and react will return
  a tag element.
  */
