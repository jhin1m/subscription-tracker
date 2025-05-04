import aj from '../config/arject.js';

const arjectMiddleware = async (req, res, next) => {

    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests',
                });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: 'Bot detected',
                });
            }

            return res.status(403).json({
                success: false,
                message: 'Forbidden',
            });
        }

        next();
    } catch {
        console.log('Arject middleware error: ', error);
        next(error);
    }
}

export default arjectMiddleware;