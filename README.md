# **TecnoDragon (guía de instalación + panel de administrador)**

## Despligue de aplicación de forma local (CLIENTE):

1. Entrar a la consola (por ejemplo símbolo de sistema o cualquier otro) y dirigirse a la carpeta [tienda_aresyagoCLIENTE].
   
2. Descargar yarn mediante este comando: npm install --global yarn
   
3. Ejecutar este comando: yarn install
   
4. Desplegar con: yarn dev (y escribir en el navegador a la URL indicada)


## Acceder al panel de administrador de Strapi:

1. Mediante este enlace, donde la el servidor está subido a heroku accede a este enlace: https://tienda-yagoares.herokuapp.com/admin/marketplace
   
2. Te pedirá iniciar sesión a mi cuenta de Strapi, aqui tienes mi sesión:
    - Usuario: yagofingoi1234@gmail.com
    - Contraseña: Saltamontes1234


### El cliente a Netlify:

-Si por alguna razón no se despliega de manera local, he subido mi página web a netlify, te permite crear, alojar y mantener tu sitio web o aplicación con implementación continua, HTTPS de 1 solo clic, entre otros. 

https://tecnodragon.netlify.app

# **Uso de la aplicación**


## Creación de una cuenta:

1. Pulsa sobre Mi cuenta


2. Se abrirá un modal donde entre otras opciones pondrá Registrarse, simplemente complentas los campos.

3. Una vez creada la cuenta te redigirá al modal de iniciar sesión para logear con tu nueva cuenta.

## Gestionar cuenta:

### Cambiar de nombre, correo y contraseña:

1- Para cambiar de nombre y apellidos simplemente borra los campos y pon los nuevos. Finalmente pulsar en acutalizar.

2- Para cambiar de correo simplemente mismo procedimineto que antes, con la diferencia que tendrás que poner tu email de nuevo para confirmar.

3- Cambiar contraseña tendrá el mismo procedimineto que el cambio de correo.

### Gestionar direcciones de envío:

1-En el apartado de direcciones pincha sobre el "+" se abrirá un modal para crear una direción de envío. Simplemente completa los campos y pulsas sobre Crear dirección. Puedes crear tantas direcciones de envío como veas conveniente.

2- Aparecerá tu dirección de envío, donde la podrás eliminar o editar. 

## Productos:

1- Accediendo a las secciones a las diferentes categorías de la tienda, encontrarás numerosos productos.

2- Si deseas buscar un producto concreto puedes usar el buscador.

3-Pulsando sobre un producto te mostrará la información del mismo. El título, el precio final, descripción, un vídeo , fecha de producción y un modal con la vista previa del producto en diferentes ángulos.

### Favoritos:

1- Pulsando sobre el corazón se te añadirá a la lista de favoritos. Para acceder a tu lista de favoritos simplente accede en el menú a favoritos.

## Compras:

1- En los detalles del producto hay una opción de comprar, si pulsas sobre él se te añadirá al carrito de compra.

2- Si accedes por el menú al carrito, podrás ver el  producto seleccionado, indicando el precio total de la compra (si compras más productos incrementará).

3- Si no tienes una dirección de envío te pedirá que crees una para continuar con el pago. En el caso de que ya hayas creado una pulsa sobre tu dirección.

4- Aparecerá un apartado donde te pedirá un número de tarjeta con su recpectiva fehca de caducidad y código de seguridad.
 - A continuación te dejo una serie de número de tarjetas de prueba para que pruebes: [4242424242424242], [4000056655665556] o accediendo al enlace puedes ver todos los números de tarjeta que proporciona Stripe: https://stripe.com/docs/testing

5- Finalmente pulsa en pagar y se te añadirá a tu lista de pedidos. En la lista de pedidos podrás ver datos como la fecha y hora de la compra como la catidad pagada.

## Cerrar sesión:

1- Simplemente pinchas sobre el icono exit y saldrás de la sesión.


# **Gestión de productos, categorías, direcciones...**

1- Tan sencillo como acceder a esta url https://tienda-yagoares.herokuapp.com/admin he iniciar sesión con mi cuenta (que lo detallo al principio)

2- Verás 5 secciones diferenciadas: Addresses, Categories, Favorites, Orders y Products. Y por ejemplo puede acceder a producto y crear un producto, editarlo o darlo de baja.

