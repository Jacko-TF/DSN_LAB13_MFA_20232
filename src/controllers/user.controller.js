const User = require('../models/User');
const speakeasy = require('speakeasy');
const QrCode = require('qrcode');

async function signup(req, res){
    try{
        const { name, email, password } = req.body;
        const secret = speakeasy.generateSecret({ length: 20 });
        console.log(secret);
        const user = new User(
            {
                username:  name,
                email: email,
                password: password,
                secret: secret.base32
            }
        );
        console.log(user);
        user.password = await user.encryptPassword(user.password);
        await user.save();
        QrCode.toDataURL(secret.otpauth_url, (err, image_data) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Internal Server Error');
            }
            //res.send({ qrCode: image_data });
            res.render(
                "qr", {
                    image_data:image_data,
                }
            )
        });
    } catch(err){
        console.log('err', err);
    }
}

async function singin(req,res){
    const { email, password, token } = req.body;

    const user = await User.findOne({email: email})

    if(!user){
        return res.status(404).json({message:"No existe el usuario"});
    }

    const validPassword = await user.validatePassword(password);

    if(!validPassword){
        return res.status(401).json({message: "Credenciales incorrectas"});
    }

    const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: 'base32',
        token,
        window: 1
      });

    if (!verified) {
        return res.status(401).json({message: "Token invalido o incorrecto"});
    }

    return res.status(200).json({message: "Usuario autenticado"});
}

module.exports = {
    signup,
    singin
}