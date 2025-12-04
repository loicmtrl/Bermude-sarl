import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className='grid md:grid-cols-4 gap-4 p-4'>
          <div className='space-y-2'>
            <ShoppingBag />
            <div className='text-sm font-bold'>Livraison gratuite</div>
            <div className='text-sm text-muted-foreground'>
              Livraison gratuite pour les commandes de plus de CHF 100
            </div>
          </div>
          <div className='space-y-2'>
            <DollarSign />
            <div className='text-sm font-bold'>Garantie de remboursement</div>
            <div className='text-sm text-muted-foreground'>
              Dans les 30 jours suivant l'achat
            </div>
          </div>
          <div className='space-y-2'>
            <WalletCards />
            <div className='text-sm font-bold'>Paiement flexible</div>
            <div className='text-sm text-muted-foreground'>
              Payez par carte de crédit, PayPal ou comptant
            </div>
          </div>
          <div className='space-y-2'>
            <Headset />
            <div className='text-sm font-bold'>Support 24/7</div>
            <div className='text-sm text-muted-foreground'>
              Obtenez de l'aide à tout moment
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
