<?php

namespace App\Http\Controllers;

use App\Models\Dumbot;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

class DumbotController extends Controller
{
    use HasUuids;
    protected $fillable = [
        'name',
        'draft'
    ];

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $bots = Dumbot::where(
            'user_id', '=', $request->user()->id
        )->get();
        
        return view('dashboard',
        [
            'bots' => $bots,
            'user' => $request->user(),
            'hasBots' => ($bots -> count()) > 0
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:225']
        ]);

        $this -> checkMaxBots($request);

        $id = Str::uuid()->toString();
        $schema = $this -> getInitialSchema($id, $request->input('name'));
        $bot = new Dumbot();
        $bot -> name =  $request->input('name');
        $bot -> published_at =  date('Y-m-d H:i:s');
        $bot -> user_id =  $request->user()->id;
        $bot -> id = $id;
        $bot -> draft = $schema;
        $bot -> schema = $schema;
        $bot -> save();

        return redirect()->route('botEditor.edit', ['botkey' => $id]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, ?string $botkey = null)
    {
        if(!$botkey) {
            $this -> checkMaxBots($request);
           
            $bot = new Dumbot();
            $timestamp = date('Y-m-d H:i:s');
            $bot -> name = "My new bot $timestamp";
            return view('editor.new', [
                'user' => $request->user(),
                'dumbot' => $bot
            ]);
        }

        $bot = Dumbot::where([
            ['id', '=', $botkey],
            ['user_id', '=', $request->user()->id]
        ])->first();

        if(!$bot) {
            abort(404);
        }

        return view('editor.edit', [
            'user' => $request->user(),
            'dumbot' => $bot,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dumbot $bot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $botkey)
    {
        Dumbot::where([
            ['id', '=', $botkey],
            ['user_id', '=', $request->user()->id]
        ])->delete();

        $bots = Dumbot::where(
            'user_id', '=', $request->user()->id
        )->get();
        
        $html = view('editor.list',
        [
            'bots' => $bots,
            'user' => $request->user(),
            'hasBots' => ($bots -> count()) > 0
        ]) -> render();

        return response()->json(['html' => $html]);
    }

    private function checkMaxBots(Request $request) {
        $botsCount = Dumbot::where('user_id', '=', $request->user()->id)->count();
            if($botsCount >=  env('MAX_BOTS', 3)) {
                abort(response() -> view('editor.toomany', [
                    'user' => $request->user(),
                    'maxBots' =>  env('MAX_BOTS', 3)
                ]));
            }
    }

    private function getInitialSchema($id, $name) {
        $schema = (object) new class{};
        $schema -> id = $id;
        $schema -> name = $name;
        $schema -> links = new class{};
        $schema -> selected = new class{};
        $schema -> paths = new class{};
        $schema -> nodes = (object) new class{};
        $schema -> nodes -> node1 = (object) new class{};
        $schema -> nodes -> node1 -> id = 'node1';
        $schema -> nodes -> node1 -> title = 'start';
        $schema -> nodes -> node1 -> user = false;
        $schema -> nodes -> node1 -> preventRemoval = true;
        $schema -> nodes -> node1 -> type = 'start';
        $schema -> nodes -> node1 -> content = [ env('BOTS_START_MESSAGE', "WELCOME!!!!!!")];
        $schema -> nodes -> node1 -> position = json_decode('{"x": 300, "y": 300}');
        $schema -> nodes -> node1 -> output = json_decode('{"type": "null", "id": "start"}');
        $schema -> nodes -> node1 -> ports = json_decode('{"default": {"id":"default", "bgColor": "brand", "text": "default", "index": 1,"properties": {}}}');
  
        return json_encode($schema);
    }
}
