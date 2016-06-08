//: Playground - noun: a place where people can play

import SpriteKit
import XCPlayground

struct Constants {
	static let gameWindow = CGRect(x: 0, y: 0, width: 640, height: 640)
}

class GameScene: SKScene {
	override init(size: CGSize) {
		super.init(size: size)
		
		setup()
		
	}
	
	required init?(coder aDecoder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	func setup() {
		setupBackground()
		
	}
	
	func setupBackground() {
		backgroundColor = UIColor.magentaColor()
	}
	
}

//:- Main
var scene = GameScene(size: Constants.gameWindow.size)
let view = SKView(frame: Constants.gameWindow)
view.presentScene(scene)

XCPlaygroundPage.currentPage.liveView = view