<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Address;
use Validator;
use App\Http\Resources\AddressResource;
use Exception;

class AddressController extends BaseController
{
    /**
     * Display a listing of addresses
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $addresses = Address::where(['user_id' => $request->header('user_id')])->get();
        return $this->sendResponse(AddressResource::collection($addresses), 'Addresses retrieved successfully.');
    }

    /**
     * Store a newly created address
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'line1' => 'required',
            'city' => 'required',
            'postalCode' => 'required',
            'countryCode' => 'required',
            'stateCode' => 'required',
            'stateName' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $input['user_id'] = $request->header('user_id');
        try {
            Address::create($input);
        } catch (Exception $e) {
            return $this->sendError($e);
        }

        return $this->sendResponse(new AddressResource($address), 'Address created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $address = Address::find($id);
        if (is_null($address)) {
            return $this->sendError('Address not found.');
        }

        return $this->sendResponse(new AddressResource($address), 'Address retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        $input = $request->all();
        $fields = ['line1', 'line2', 'line3', 'line4', 'city', 'postalCode', 'countryCode', 'stateCode', 'stateName'];
        foreach ($input as $key => $value) {
            if (!in_array($key, $fields)) continue;
            $address->$key = $value;
        }
        try {
            $address->save();
        } catch (Exception $e) {
            return $this->sendError($e);
        }
        return $this->sendResponse(new AddressResource($address), 'Address updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function destroy(Product $product)
    // {
    //     $product->delete();

    //     return $this->sendResponse([], 'Product deleted successfully.');
    // }
}
