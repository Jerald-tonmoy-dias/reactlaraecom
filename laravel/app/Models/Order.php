<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Orderitems;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'firstname',
        'lastname',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'zipcode',
        'payment_id',
        'payment_mode',
        'tracking_no',
        'status',
        'remark'
    ];

    public function Orderitems()
    {
        // here $this means the Order table
        return $this->hasMany(Orderitems::class, 'order_id', 'id');
    }
}
